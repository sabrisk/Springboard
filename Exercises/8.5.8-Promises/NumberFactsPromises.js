const numbersAPI = "http://numbersapi.com/";

async function getNumberFact(num) {
	const response = await fetch(numbersAPI + num + "?json");
	const json = await response.json();
	console.log("\n-----Get a single number fact-----");
	console.log(json.text);
}

async function getNumberFacts(numRanges) {
	const response = await fetch(numbersAPI + numRanges);
	const json = await response.json();

	console.log("\n-----Get multiple number facts-----");
	for (const key in json) {
		if (json.hasOwnProperty(key)) {
			const value = json[key];
			console.log(value);
		}
	}
	console.log("\n");
}

//probably do a promise all here
async function getFavoriteNumberFacts(num, numFacts) {
	const promisesArr = [];
	for (let i = 0; i < numFacts; i++) {
		const numberPromise = fetch(numbersAPI + num + "?json").then((res) =>
			res.json()
		);
		promisesArr.push(numberPromise);
	}

	const responses = await Promise.all(promisesArr);
	console.log("\n------Get " + numFacts + " favorite number facts-----");
	for (r of responses) {
		console.log(r.text);
	}
}

getNumberFact(69);

getNumberFacts("1..10");

getFavoriteNumberFacts(7, 7);
