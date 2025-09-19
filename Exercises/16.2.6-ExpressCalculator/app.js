import express from "express";

import { createMathHandler } from "./handlers.js";

const app = express();

app.get("/mean", createMathHandler("mean"));
app.get("/median", createMathHandler("median"));
app.get("/mode", createMathHandler("mode"));
app.get("/all", createMathHandler("all"));

export default app;
