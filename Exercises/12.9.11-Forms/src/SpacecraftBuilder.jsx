import { useState } from "react";
import ItemForm from "./ItemForm.jsx";
import InventoryDisplay from "./InventoryDisplay.jsx";

const SpacecraftBuilder = () => {
	const [inventory, setInventory] = useState([]);
	const addItem = (item) =>
		setInventory((prevInventory) => [...prevInventory, item]);

	const deleteItem = (id) =>
		setInventory((prevInventory) =>
			prevInventory.filter((item) => item.id !== id)
		);

	return (
		<div className="SpacecraftBuilder">
			<h1>Spacecraft Builder</h1>
			<ItemForm addItem={addItem} />
			<InventoryDisplay inventory={inventory} deleteItem={deleteItem} />
		</div>
	);
};

export default SpacecraftBuilder;
