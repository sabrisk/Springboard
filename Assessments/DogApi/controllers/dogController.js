import mongoose from "mongoose";
import { Dog } from "../models/Dog.js";
import User from "../models/User.js";

export const dog_get = async (req, res) => {
	const result = await Dog.find().lean();
	res.status(200).json({ data: result });
};
export const registered_dog_get = async (req, res) => {
	const currentUser = res.locals.user;
	if (!currentUser) return res.status(401).json({ error: "Please login" });

	const { page = 1, limit = 10, status } = req.query;
	try {
		const {
			dogs,
			page: currentPage,
			totalPages,
		} = await Dog.findRegisteredDogs(currentUser._id, {
			page,
			limit,
			status,
		});

		res.status(200).json({
			success: true,
			data: dogs.map((dog) => dog.toObject()),
			page: currentPage,
			totalPages,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error" });
	}
};

export const adopted_dog_get = async (req, res) => {
	const currentUser = res.locals.user;
	if (!currentUser) return res.status(401).json({ error: "Please login" });

	const { page = 1, limit = 10 } = req.query;
	// const filter = { adoptedBy: currentUser._id };

	try {
		const {
			dogs,
			page: currentPage,
			totalPages,
		} = await Dog.findAdoptedDogs(currentUser._id, { page, limit });

		res.status(200).json({
			success: true,
			data: dogs.map((dog) => dog.toObject()),
			page: currentPage,
			totalPages,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error" });
	}
};

export const dog_post = async (req, res) => {
	const currentUser = res.locals.user;
	if (!currentUser) return res.status(401).json({ error: "Please login" });
	req.body.initialOwner = currentUser._id;

	const { name, description } = req.body;

	try {
		const dog = await Dog.createNewDog(name, description, currentUser._id);

		res.status(200).json({
			success: true,
			data: dog.toObject(),
			message: "Dog created successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error" });
	}
};

export const adopt_dog_post = async (req, res) => {
	const currentUser = res.locals.user;
	const { id: dogId } = req.params;

	if (!currentUser) return res.status(401).json({ error: "Please login" });

	if (!mongoose.Types.ObjectId.isValid(dogId)) {
		return res.status(400).json({ error: "Invalid dog ID" });
	}

	try {
		const updatedDog = await Dog.adoptDog(dogId, currentUser._id);
		const initialOwner = await User.findById(updatedDog.initialOwner);

		res.status(200).json({
			success: true,
			data: updatedDog.toObject(),
			message: `Thank you ${initialOwner.name} for putting ${updatedDog.name} up for adoption!`,
		});
	} catch (error) {
		console.log(error);
		res.status(error.status || 500).json({
			error: error.message || "Server error",
		});
	}
};

export const remove_dog_post = async (req, res) => {
	const currentUser = res.locals.user;
	const { id: dogId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(dogId)) {
		return res.status(400).json({ error: "Invalid dog ID" });
	}

	if (!currentUser) return res.status(401).json({ error: "Please login" });

	try {
		const deletedDog = await Dog.deleteDog(dogId, currentUser._id);
		res.status(200).json({
			success: true,
			data: deletedDog.toObject(),
			message: "Dog deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(error.status || 500).json({
			error: error.message || "Server error",
		});
	}
};
