import express from "express";
import chalk from "chalk";
import morgan from "morgan";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { morganMiddleware, systemLogs } from "./utils/logger.js";
import mongoSanitize from "express-mongo-sanitize";
import conncetToDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { apiLimiter } from "./middlewares/apiLimiter.js";

await conncetToDB();

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(morganMiddleware);
app.use(express.urlencoded({ extended: false }));

app.get("/api/v1/test", (req, res) => {
	const books = [
		{ id: 1, title: "Book 1" },
		{ id: 2, title: "Book 2" },
		{ id: 3, title: "Book 3" },
	];

	res.json(books);
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", apiLimiter, userRoutes);
app.use(notFound);
app.use(errorHandler);

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
