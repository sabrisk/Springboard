function ItemCard({ children, name, qty, purpose }) {
	return (
		<div className="ItemCard">
			<div className="details">
				<h2>{`Name: ${name}`}</h2>
				<p>{`Quantity: ${qty}`}</p>
				<p>{`Purpose: ${purpose}`}</p>
			</div>
			<div className="action">{children}</div>
		</div>
	);
}

export default ItemCard;
