import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import dogRoutes from "./routes/dogRoutes.js";
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddleware.js";
import connect from "./db.js";
dotenv.config();

// Database connection
await connect();
console.log("Connected to database");

// Start server
const app = express();
app.listen(3000);
console.log("Listening on port 3000");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(checkUser);

// Routes
app.use(dogRoutes);
app.use(authRoutes);
