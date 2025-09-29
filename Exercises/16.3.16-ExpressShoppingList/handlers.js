import { items } from "./fakeDb.js";

export const getItemsHandler = (req, res) => {
	const response = items;
	res.status(201).json(response);
};

export const postItemsHandler = (req, res) => {
	items.push(req.body);
	res.status(201).json({ added: req.body });
};

export const getItemHandler = (req, res) => {
	const itemName = req.params.name;
	const itemResponse = items.find((i) => i.name === itemName);
	console.log(req);
	res.status(200).json(itemResponse);
};

export const patchItemHandler = (req, res) => {
	const itemName = req.params.name;
	const newItem = req.body;
	console.log(req.body);
	const itemToUpdate = items.find((i) => i.name === itemName);

	Object.assign(itemToUpdate, newItem);

	res.status(201).json({ updated: itemToUpdate });
};

export const deleteItemHandler = (req, res) => {
	const itemName = req.params.name;
	const itemToDeleteIndex = items.findIndex((i) => i.name === itemName);

	items.splice(itemToDeleteIndex, 1);

	res.status(202).json({ message: "deleted" });
};
