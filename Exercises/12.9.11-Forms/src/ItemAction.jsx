function ItemAction({ deleteItem, id }) {
	const handleDelete = (e) => {
		e.preventDefault();
		deleteItem(id);
	};

	return (
		<div className="ItemAction">
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
}

export default ItemAction;
