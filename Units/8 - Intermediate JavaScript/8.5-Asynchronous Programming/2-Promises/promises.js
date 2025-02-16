"use strict";

function setup() {
	let test = delayES8(1000)
		.then(() => console.log("hello"))
		.catch((err) => console.log(err));

	delay(10000)
		.then(() => console.log("hello"))
		.catch((err) => console.log(err));
}

async function delayES8(time) {
	await delay(time);

	return;
}

function delay(time) {
	return new Promise((resolve, reject) => {
		if (isNaN(time)) {
			reject(new Error("Delay requires a valid number."));
		} else {
			setTimeout(resolve, time);
		}
	});
}

setup();
