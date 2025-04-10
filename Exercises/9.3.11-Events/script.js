document.addEventListener("DOMContentLoaded", () => {
	const colorFormElem = document.getElementById("color-form");
	const boxContainerDivElem = document.getElementById("box-container");
	const newBoxButtonElem = document.getElementById("new-box-button");
	const colorInputElem = document.getElementById("color-input");
	let boxColor = "";
	let boxIdCounter = 1;

	colorFormElem.addEventListener("submit", (event) => {
		event.preventDefault();
		boxColor = colorInputElem.value;
		const boxes = document.querySelectorAll(".box");
		for (let b of boxes) {
			b.style.backgroundColor = boxColor;
		}
		colorInputElem.value = "";
	});

	newBoxButtonElem.addEventListener("click", () => {
		newBox();
	});

	document.addEventListener("dblclick", (event) => {
		if (event.target.classList.contains("box")) {
			event.target.remove();
		}
	});

	document.addEventListener("mousemove", (event) => {
		if (event.target.classList.contains("box")) {
			event.target.getElementsByTagName(
				"p"
			)[0].innerHTML = `x:${event.screenX} y:${event.screenY}`;
		}
	});

	document.addEventListener("mouseout", (event) => {
		if (event.target.classList.contains("box")) {
			event.target.getElementsByTagName("p")[0].innerHTML =
				event.target.getAttribute("data");
		}
	});

	document.addEventListener("keydown", (event) => {
		console.log(event);
		if (
			event.key.toLowerCase() === "n" &&
			event.target.id !== "color-input"
		) {
			newBox();
		}
	});

	function newBox() {
		const box = document.createElement("div");
		box.innerHTML = `<p>${boxIdCounter}</p>`;
		box.className = "box";
		box.style.backgroundColor = boxColor;
		box.setAttribute("data", boxIdCounter);
		boxContainerDivElem.appendChild(box);
		boxIdCounter++;
	}
});
