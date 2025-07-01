import ItemCard from "./ItemCard.jsx";
import ItemAction from "./ItemAction.jsx";

function InventoryDisplay({ inventory, deleteItem }) {
	return (
		<div className="InventoryDisplay">
			{inventory.length ? <h1>Inventory</h1> : null}
			{inventory.map((item) => (
				<ItemCard key={item.id} {...item}>
					<ItemAction id={item.id} deleteItem={deleteItem} />
				</ItemCard>
			))}
		</div>
	);
}

export default InventoryDisplay;
