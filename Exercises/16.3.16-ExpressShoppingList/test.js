const getItems = async () => {
	const promise = await fetch("http://localhost:3000/items/");
	const response = await promise.json();
	console.log(response);
};

await getItems();
