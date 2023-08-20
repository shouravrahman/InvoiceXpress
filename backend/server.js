import express, { urlencoded } from "express";
import chalk from "chalk";
import morgan from "morgan";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/api/v1/test", (req, res) => {
	res.send("api on work");
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
});
