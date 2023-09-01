import express from "express";
import chalk from "chalk";
import morgan from "morgan";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { morganMiddleware, systemLogs } from "./utils/logger.js";
const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
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
