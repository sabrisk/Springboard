import mongoose from "mongoose";

let isConnected = false;

const connect = async () => {
	const dbURI = process.env.MONGODB_URI;
	if (!dbURI) {
		throw new Error("MONGODB_URI environment variable is not set.");
	}

	if (isConnected) return mongoose.connection;

	try {
		const conn = await mongoose.connect(dbURI, {
			serverSelectionTimeoutMS: 5000,
		});

		isConnected = true;
		console.log(`MongoDB connected: ${conn.connection.host}`);
		return conn.connection;
	} catch (error) {
		console.error("MongoDB connection error:", error.message);
		throw error;
	}
};

const disconnect = async () => {
	if (isConnected) {
		await mongoose.connection.close();
		isConnected = false;
		console.log("MongoDB disconnected");
	}
};

export default connect;
export { disconnect };
