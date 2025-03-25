const currInventory = [];

export function addItem(name) {
	currInventory.push(name);
}

export function removeItem(name) {
	// can use find by index function to get the index and then slice?
	const itemIndex = currInventory.findIndex((item) => {
		return item === name;
	});

	if (itemIndex !== -1) {
		currInventory.splice(itemIndex, 1);
	} else {
		console.log("Item not found");
	}
	return itemIndex;
}

export function listItems() {
	let items = currInventory.join(", ");

	console.log(`The current inventory includes : ${items}`);
}
