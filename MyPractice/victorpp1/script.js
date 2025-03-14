//1) timers???

const arrayOfColors = ["red", "green", "purple"];
let idx = 0;

// redesign this such after 1 second, we change color
// setTimeout(function, time);

// setInterval(() => {
// 	document.body.style.backgroundColor = arrayOfColors[idx];
// 	idx++;
// 	if (idx >= arrayOfColors.length) {
// 		idx = 0;
// 	}
// }, 1000);

async function func() {
	while (true) {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				document.body.style.backgroundColor = arrayOfColors[idx];
				resolve();
			}, 1000);
		});
		await promise;
		idx++;
		if (idx > arrayOfColors.length - 1) {
			idx = 0;
		}

		// console.log(promise);
		// research: how would one go back to the beginning of the loop
	}
}

func();

// 2) Objects??

// 3) promises?
