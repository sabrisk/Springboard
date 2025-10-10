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

dogSchema.statics.findRegisteredDogs = async function (
	ownerId,
	{ page = 1, limit = 10, status } = {}
) {
	page = Math.max(1, parseInt(page));
	limit = Math.max(1, parseInt(limit));
	const filter = { initialOwner: ownerId };
	if (status) filter.status = status;

	const dogs = await this.find(filter)
		.skip((page - 1) * limit)
		.limit(parseInt(limit));

	const total = await this.countDocuments(filter);

	return {
		dogs,
		page: Number(page),
		totalPages: Math.ceil(total / limit),
	};
};

dogSchema.statics.findAdoptedDogs = async function (
	ownerId,
	{ page = 1, limit = 10 } = {}
) {
	page = Math.max(1, parseInt(page));
	limit = Math.max(1, parseInt(limit));
	const filter = { adoptedBy: ownerId };

	const dogs = await Dog.find(filter)
		.skip((page - 1) * limit)
		.limit(parseInt(limit));

	const total = await this.countDocuments(filter);

	return {
		dogs,
		page: Number(page),
		totalPages: Math.ceil(total / limit),
	};
};

dogSchema.statics.createNewDog = async function (name, description, ownerId) {
	const dog = await Dog.create({
		name,
		description,
		initialOwner: ownerId,
	});

	return dog;
};

dogSchema.statics.adoptDog = async function (dogId, ownerId) {
	const dog = await Dog.findById(dogId);
	if (!dog) throw { status: 404, message: "Dog not found" };

	const updatedDog = await Dog.findOneAndUpdate(
		{ _id: dogId, adoptedBy: { $exists: false } },
		{ $set: { status: "adopted", adoptedBy: ownerId } },
		{ new: true }
	);

	if (!updatedDog) throw { status: 403, message: "Dog already adopted" };

	if (dog.initialOwner.equals(ownerId))
		throw { status: 403, message: "You cannot adopt your own dog" };

	return updatedDog;
};

dogSchema.statics.deleteDog = async function (dogId, ownerId) {
	const dog = await Dog.findById(dogId);

	if (!dog) throw { status: 404, message: "Dog not found" };

	if (dog.adoptedBy)
		throw { status: 403, message: "Adopted dogs can not be removed" };

	if (!dog.initialOwner.equals(ownerId))
		throw {
			status: 403,
			message:
				"Only the user who registered the dog is allowed to remove it",
		};

	const deletedDog = await Dog.findOneAndDelete({
		_id: dog._id,
		initialOwner: ownerId,
		adoptedBy: { $exists: false },
	});

	if (!deletedDog) throw { status: 404, message: "Dog not found" };

	return deletedDog;
};

export const Dog = mongoose.model("dog", dogSchema);

console.log("Dog");
