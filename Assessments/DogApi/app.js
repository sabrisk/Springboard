import express from "express";
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import dogRoutes from "./routes/dogRoutes.js";
import cors from "cors";

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(checkUser);

// Routes
app.use(dogRoutes);
app.use(authRoutes);

export default app;
