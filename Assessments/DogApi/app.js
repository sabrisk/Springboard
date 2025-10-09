import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import dogRoutes from "./routes/dogRoutes.js";
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddleware.js";

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
app.use(checkUser);

// app.post("/register", async (req, res) => {
// 	const { username, password } = req.body;
// 	const result = await Dog.insertOne
// });
app.use(dogRoutes);
app.use(authRoutes);
console.log("app.js");
