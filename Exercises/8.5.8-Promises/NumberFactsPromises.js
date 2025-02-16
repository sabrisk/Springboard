const numbersAPI = "http://numbersapi.com/";

async function getNumberFact() {
	const num = 54;
	const response = await fetch(numbersAPI + num + "?json");
	const json = await response.json();
	const titleElem = document.createElement("p");

	titleElem.textContent = "-----Get a single number fact-----";
	document.body.append(titleElem);

	const p = document.createElement("p");
	p.textContent = json.text;
	document.body.append(p);
}

async function getNumberFacts() {
	const numRanges = "1..10";
	const response = await fetch(numbersAPI + numRanges);
	const json = await response.json();
	const titleElem = document.createElement("p");

	titleElem.textContent = "-----Get multiple number facts-----";
	document.body.append(titleElem);

	for (const key in json) {
		const p = document.createElement("p");
		if (json.hasOwnProperty(key)) {
			p.textContent = json[key];
			document.body.append(p);
		}
	}
}

async function getFavoriteNumberFacts() {
	const num = 7;
	const numFacts = 7;
	const promisesArr = [];
	for (let i = 0; i < numFacts; i++) {
		const numberPromise = fetch(numbersAPI + num + "?json").then((res) =>
			res.json()
		);
		promisesArr.push(numberPromise);
	}
	const responses = await Promise.all(promisesArr);

	const titleElem = document.createElement("p");

	titleElem.textContent =
		"------Get " + numFacts + " favorite number facts-----";
	document.body.append(titleElem);

	for (r of responses) {
		const p = document.createElement("p");
		p.textContent = r.text;
		document.body.append(p);
	}
}
