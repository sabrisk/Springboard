import mongoose from "mongoose";

const connect = async () => {
	const dbURI = process.env.MONGODB_URI;
	try {
		const result = await mongoose.connect(dbURI);
	} catch (error) {
		console.log(error);
	}
};

export default connect;
