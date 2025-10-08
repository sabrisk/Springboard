import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Dog from "./models/Dog.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = process.env.MONGODB_URI;
try {
	const result = await mongoose.connect(dbURI);
	console.log("Connected to database");
	app.listen(3000);
	console.log("Listening on port 3000");
} catch (error) {
	console.log(error);
}

app.get("/dogs", async (req, res) => {
	const result = await Dog.find();
	console.log(result);
	res.status(200).json({ data: result });
});
