import { systemLogs } from "../utils/logger.js";

class CustomError extends Error {
	constructor(message, statusCode = 500) {
		super(message);

		this.name = this.constructor.name;
		this.timestamp = new Date().toISOString();
		this.statusCode = statusCode;
		systemLogs.error(this);
	}

	toJSON() {
		return {
			error: {
				name: this.name,
				message: this.message,
				timestamp: this.timestamp,
				statusCode: this.statusCode,
				stackTrace: process.env.NODE_ENV === "development" ? this.stack : null,
			},
		};
	}
}
class AuthenticationError extends CustomError {
	constructor(message = "Authentication failed") {
		super(message);
		this.statusCode = 401; // Set appropriate status code
	}
}
class NotFoundError extends CustomError {
	constructor(message) {
		super(message, 404);
	}
}

class NetworkError extends CustomError {
	constructor(message) {
		super(message, 500);
	}
}

class UnauthorizedError extends CustomError {
	constructor(message) {
		super(message, 401);
	}
}

class ValidationError extends CustomError {
	constructor(message) {
		super(message, 400);
	}
}

class DatabaseError extends CustomError {
	constructor(message) {
		super(message, 500);
	}
}

class ConflictError extends CustomError {
	constructor(message) {
		super(message, 409);
	}
}

class UncaughtExceptionError extends CustomError {
	constructor(message, originalError) {
		super(message, 500);
		this.originalError = originalError; // Preserve original error for context
	}
}

class UserNotVerifiedError extends CustomError {
	constructor(message) {
		super(message, 400);
	}
}

class UserInactiveError extends CustomError {
	constructor(message) {
		super(message, 400);
	}
}
export {
	CustomError,
	NotFoundError,
	NetworkError,
	UnauthorizedError,
	ValidationError,
	DatabaseError,
	ConflictError,
	UncaughtExceptionError,
	UserNotVerifiedError,
	UserInactiveError,
	AuthenticationError,
};
