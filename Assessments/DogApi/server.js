import dotenv from "dotenv";
import connect from "./db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	try {
		await connect();
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
};

startServer();
