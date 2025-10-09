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
	initialOwner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: [true, "Dog must have an initial owner"],
	},
	adoptedBy: {
		type: mongoose.Schema.Types.ObjectId, //object id
		ref: "user",
	},
});

export const Dog = mongoose.model("dog", dogSchema);

console.log("Dog");
