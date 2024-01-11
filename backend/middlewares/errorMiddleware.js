import { CustomError, NotFoundError } from "../errors/customError.js";
import { systemLogs } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
	console.error(err);
	systemLogs.error(err);

	if (err instanceof CustomError) {
		console.error(`Error: ${err.message}`);
		res.status(err.statusCode).json(err.toJSON());
	} else {
		console.error(`Unknown Error: ${err.message}`);
		res.status(500).json({ error: { message: "Internal Server Error" } });
	}
};
