import express from "express";
import cors from "cors";

import items from "./routes/items.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/items", items);

export default app;
