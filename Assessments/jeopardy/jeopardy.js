document.addEventListener("DOMContentLoaded", () => {
	const NUM_API_CATEGORIES = 100;
	const NUM_BOARD_CATEGORIES = 6;
	const NUM_QUESTIONS_PER_CAT = 5; //The rithm-jeopardy api only supports returning 5 questions
	const BASE_API_URL = "https://rithm-jeopardy.herokuapp.com/api/";

	//Array to hold all category objects
	let categories;

	/* Counter to set a unique id on each clue
	to use as <td> element attribute to avoid
	duplicate click event listeners */
	let clueId = 1;

	async function getCategoryIds() {
		const response = await axios.get(
			`${BASE_API_URL}categories?count=${NUM_API_CATEGORIES}`
		);
		const categoriesData = response.data;

		const categoryIdSet = new Set();

		/*Adds random category ids to a set
		until size = NUM_BOARD_CATEGORIES.
		Set ignores duplicates.*/
		while (categoryIdSet.size < NUM_BOARD_CATEGORIES) {
			const randIdx = Math.floor(Math.random() * categoriesData.length);
			const categoryId = categoriesData[randIdx].id;
			categoryIdSet.add(categoryId);
		}
		return Array.from(categoryIdSet);
	}

	async function getCategory(catId) {
		const response = await axios.get(`${BASE_API_URL}category?id=${catId}`);

		const categoryData = response.data;

		return {
			title: categoryData.title,
			clues: categoryData.clues.map((clue) => {
				const tempClueObj = {
					id: clueId,
					question: clue.question,
					answer: clue.answer,
					showing: null,
				};
				clueId++;
				return tempClueObj;
			}),
		};
	}

	async function loadCategories(categoryIds) {
		const tempCategories = [];

		for (const catId of categoryIds) {
			tempCategories.push(await getCategory(catId));
		}
		return tempCategories;
	}

	async function fillTable() {
		const table = document.createElement("table");
		const thead = document.createElement("thead");
		const theadTr = document.createElement("tr");
		const tbody = document.createElement("tbody");

		table.appendChild(thead);
		thead.appendChild(theadTr);
		table.appendChild(tbody);

		//Add titles
		for (const category of categories) {
			const td = document.createElement("td");
			theadTr.appendChild(td);
			td.innerText = category.title;
		}

		//Add questions
		/*Build each table row by getting one clue at a time
		for each category object*/
		for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
			const tr = document.createElement("tr");
			for (let x = 0; x < categories.length; x++) {
				const td = document.createElement("td");

				td.dataset.clueId = categories[x].clues[i].id;

				const questionMarkDiv = document.createElement("div");
				questionMarkDiv.classList.add("question-mark");

				const textNode = document.createTextNode("?");
				questionMarkDiv.appendChild(textNode);
				td.appendChild(questionMarkDiv);
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}

		document.body.appendChild(table);
	}

	function findClue(clickedClueId) {
		let clue = undefined;

		for (const category of categories) {
			clue = category.clues.find(
				(currentClue) => currentClue.id.toString() === clickedClueId
			);
			if (clue !== undefined) return clue;
		}
		return clue;
	}

	function handleTableClick(evt) {
		const td = evt.target.closest("td");

		if (td === null) return;

		const clickedClueId = td.dataset.clueId;
		if (clickedClueId == null) return;

		const clue = findClue(clickedClueId);
		if (clue === undefined) return;

		if (clue.showing === null) {
			clue.showing = "question";
			td.innerHTML = clue.question;
		} else if (clue.showing === "question") {
			clue.showing = "answer";
			td.innerHTML = clue.answer;
			td.classList.add("answer");
		}
	}

	function createHeader() {
		const gameNameHeader = document.createElement("h1");
		gameNameHeader.innerText = "Jeopardy!";
		document.body.appendChild(gameNameHeader);

		const startButton = document.createElement("button");
		startButton.textContent = "Start!";
		startButton.className = "start-button";
		startButton.addEventListener("click", startClickHandler);

		document.body.appendChild(startButton);
	}

	async function startClickHandler(evt) {
		await setupAndStart();
	}

	function showLoadingView() {
		const table = document.getElementsByTagName("table")[0];
		if (table !== undefined) table.remove();

		const loadingSpinner = document.createElement("img");
		loadingSpinner.className = "loading-spinner";
		loadingSpinner.src = "./loading.gif";
		document.body.appendChild(loadingSpinner);

		const startButton = document.getElementsByClassName("start-button")[0];
		startButton.disabled = true;

		startButton.textContent = "Loading...";
	}

	function hideLoadingView() {
		const loadingSpinner =
			document.getElementsByClassName("loading-spinner")[0];
		loadingSpinner.remove();

		const startButton = document.getElementsByClassName("start-button")[0];
		startButton.disabled = false;
		startButton.textContent = "Restart!";
	}

	async function setupAndStart() {
		showLoadingView();
		const categoryIds = await getCategoryIds();
		categories = await loadCategories(categoryIds);
		hideLoadingView();
		await fillTable(categoryIds);
		const table = document.getElementsByTagName("table")[0];
		table.addEventListener("click", handleTableClick);

		clueId = 1; //Restart id counter;
	}

	createHeader();
});
