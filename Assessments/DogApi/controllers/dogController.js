import { Dog } from "../models/Dog.js";
import User from "../models/User.js";

export const dog_get = async (req, res) => {
	const result = await Dog.find();
	console.log(result);
	res.status(200).json({ data: result });
};
export const dog_post = async (req, res) => {
	const currentUser = res.locals.user;
	if (!currentUser) return res.status(401).json({ msg: "bad user" });
	console.log(currentUser);
	req.body.initialOwner = currentUser._id;
	const result = await Dog.insertOne(req.body);
	console.log(result);
	res.status(200).json({ data: result });
};

export const adopt_dog_post = async (req, res) => {
	console.log("in adopt_dog_post ");
	const id = req.params.id;
	const currentUser = res.locals.user;
	if (!currentUser)
		return res
			.status(401)
			.json({ msg: "Please login before attempting to adopt a dog" });
	try {
		const dog = await Dog.findById(id);
		if (dog.initialOwner.equals(currentUser._id)) {
			return res.status(401).json({
				error: "The person who registered the dog can not adopt that dog.",
			});
		}
		if (dog.adoptedBy)
			return res
				.status(401)
				.json({ error: `${dog.name} has already been adopted` });

		const initialOwner = await User.findById(dog.initialOwner);

		const result = await Dog.updateOne(
			{ _id: dog._id },
			{ $set: { status: "adopted", adoptedBy: currentUser._id } }
		);
		res.status(200).json({
			msg: `Thank you ${initialOwner.name} for putting ${dog.name} up for adoption!`,
			result,
		});
	} catch (error) {
		console.log(error);
	}
};
