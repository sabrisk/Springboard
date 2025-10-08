import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Dog must have a name"],
	},
	description: {
		type: String,
		required: [true, "Please enter a description for the dog"],
	},
	status: {
		type: String,
		enum: ["available", "adopted"],
		default: "available",
	},
});

export default mongoose.model("dog", dogSchema);
