import chalk from "chalk";
import mongoose from "mongoose";
import { systemLogs } from "../utils/logger.js";

const conncetToDB = async () => {
	try {
		const connectionParams = { dbName: process.env.DB_NAME };
		const connect = await mongoose.connect(
			process.env.MONGO_URI,
			connectionParams
		);

		console.log(
			`${chalk.blue.bold(`✔ MongoDb connected : ${connect.connection.host}`)}`
		);
		systemLogs.info(` MongoDb connected : ${connect.connection.host}`);
	} catch (error) {
		console.error(`${chalk.blue.bold(`Error: ${error.message}`)}`);
	}
};

export default conncetToDB;
