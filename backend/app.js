import chalk from "chalk";
import "dotenv/config";
import { systemLogs } from "./utils/logger.js";
import conncetToDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { apiLimiter } from "./middlewares/apiLimiter.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import app from "./app.config.js";
import { UncaughtExceptionError } from "./errors/customError.js";
import { getGlobals } from "common-es";
const { __dirname, __filename } = getGlobals(import.meta.url);
// CORS and Swagger are set in server.js to ensure they apply globally to all routes and middleware
const corsOptions = {
	origin: "*", // change in production
	credentials: true, // enable set cookie
	// optionsSuccessStatus: 200,
	// methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	// allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const definition = {
	info: {
		// API information (required)
		title: "Invoice Express", // Title (required)
		version: "1.0.0", // Version (required)
	},
	securityDefinitions: {
		bearerAuth: {
			type: "apiKey",
			name: "Authorization",
			scheme: "bearer",
			in: "header",
		},
	},
};
const swaggerDocs = swaggerJsdoc({
	definition,
	apis: [path.join(__dirname, "swagger", "api.json")],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

await conncetToDB();

app.get("/", (req, res) => {
	res.send("hello world");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", apiLimiter, userRoutes);

app.all("*", (req, res) => {
	res.status(404).send("Not Found");
});
// If you are looking for error middlewares ===> error middleware is defined in app.config.js, which is imported and used to configure the app instance in app.js. This means:
// The error middleware is added to the app instance before any routes are defined in app.js.
// It sits at the end of the middleware chain, ready to catch any errors that propagate through the routes.

const PORT = process.env.PORT || 2001;

app.listen(PORT, () => {
	console.log(
		`${chalk.yellowBright.bold(
			"✔"
		)} 👍 Server is running in ${chalk.blueBright.bold(
			process.env.NODE_ENV
		)} mode on PORT ${chalk.green.bold(PORT)}`
	);
	systemLogs.info(
		`Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
	);
});
