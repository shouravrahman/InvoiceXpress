import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import { morganMiddleware, systemLogs } from "./utils/logger.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(morganMiddleware);
app.use(express.urlencoded({ extended: false }));

process.on("uncaughtException", (err) => {
	systemLogs.error("Uncaught Exception:", err);

	// Attempt to send error response if possible (assuming res is accessible)
	if (res) {
		const uncaughtExceptionError = new CustomError("Uncaught Exception", 500);
		systemLogs.error(uncaughtExceptionError);
		res.status(500).json(uncaughtExceptionError.toJSON());
	}

	// Optionally terminate the process to prevent unexpected behavior
	process.exit(1);
});

// Unhandled Promise Rejection Middleware:

// Purpose: Captures and handles unhandled promise rejections within the middleware chain.
// Functionality:
// Checks if an incoming error is an UnhandledPromiseRejectionError.
// Creates a custom unhandledRejectionError for structured logging and response.
// Logs the error using systemLogs.
// Sends a 500 status code with the error details in JSON format.
// Passes other errors to subsequent middleware.
// notFound Middleware:

// Purpose: Handles 404 (Not Found) errors for routes that don't exist.
// Functionality:
// Typically creates a custom error or response indicating a 404 error.
// errorHandler Middleware:

// Purpose: Handles general errors that haven't been caught by previous middleware.
// Functionality:
// Logs errors using systemLogs.
// Generates appropriate responses based on error types (using CustomError).
// Sends 500 status code with generic error message for unknown errors.
// General Error Logging Middleware:

// Purpose: Logs any errors that reach the end of the middleware chain.
// Functionality:
// Logs errors using systemLogs.
// Passes the error to subsequent middleware (which might be an error handler in Express itself).
// Key Points:

// Each middleware has a specific responsibility in the error handling process.
// The order of middleware matters: Specific handlers (unhandled rejections, 404, general errors) should come before the general logging middleware.
// This setup ensures comprehensive error handling, logging, and informative responses for different error scenarios.

// app.use(notFound);
app.use(errorHandler);

process.on("unhandledRejection", (reason, promise) => {
	systemLogs.error("Unhandled Promise Rejection:", reason, promise);

	if (res) {
		const unhandledRejectionError = new CustomError(
			"Unhandled Promise Rejection",
			500
		);
		systemLogs.error(unhandledRejectionError);
		res.status(500).json(unhandledRejectionError.toJSON());
	}

	process.exit(1);
});
// The errorHandler middleware is placed after notFound in the middleware chain.
// This ensures that notFound has a chance to handle 404 errors specifically before other errors are potentially handled by errorHandler.
// If a different type of error occurs within the notFound middleware itself (e.g., a database connection issue while generating the 404 response), it would then be passed to errorHandler for further processing.

export default app;
