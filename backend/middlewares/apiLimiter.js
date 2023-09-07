import { rateLimit } from "express-rate-limit";
import { systemLogs } from "../utils/logger";

export const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: {
		message:
			"Too many request from this IP address, please try again after 15 minutes",
	},
	handler: (req, res, next, options) => {
		systemLogs.error(
			`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
		);
		response.status(options.statusCode).send(options.message);
	},
	standardHeaders: true, // Set `RateLimit` and `RateLimit-Policy`` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const loginLimiter = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 20,
	message: {
		message:
			"Too many login attempts from this IP address, please try again after 30 minutes",
	},
	handler: (req, res, next, options) => {
		systemLogs.error(
			`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
		);
		response.status(options.statusCode).send(options.message);
	},
	standardHeaders: true, // Set `RateLimit` and `RateLimit-Policy`` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
