function solveTask1() {
	document.getElementById("task1").innerText = "Changed using 'innerText'.";
}
solveTask1();

document.getElementById("task2").innerHTML =
	'<button type="button">Submit</button>';
document.body.style.backgroundColor = "#232323";
const itemElements = document.getElementsByClassName("item");
for (let i of itemElements) {
	i.style.border = "2px solid black";
}
document
	.getElementById("task5")
	.setAttribute("href", "https://www.springboard.com/");
document.getElementById("task6").value = "DOM Master";
document.getElementById("task7").classList.add("new-class");
const task8Div = document.getElementById("task8");

const button = document.createElement("button");
button.textContent = "A button";
button.type = "button"; // Set attributes

task8Div.append(button);
document.getElementById("task9").remove();
