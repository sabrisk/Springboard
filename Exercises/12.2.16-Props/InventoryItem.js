function InventoryItem({ children, name, type, quantity, price }) {
	const THRESHOLD = 1000;
	return (
		<li>
			<h2>
				{name} ({type})
			</h2>
			{quantity < 5 && <p>Low Stock! {quantity} remain</p>}
			{quantity * price > THRESHOLD && (
				<Message>High value - consider extra protection!</Message>
			)}
		</li>
	);
}
