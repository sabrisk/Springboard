import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI = process.env.MONGODB_URI;
try {
	const result = await mongoose.connect(dbURI);
	console.log("Connected to database");
	app.listen(3000);
} catch (error) {
	console.log(error);
}

app.get("/dogs", async (req, res) => {
	res.status(200).json({ message: "Dogs gets successful." });
});
