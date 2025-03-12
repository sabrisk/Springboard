// Task 1: Declare The Task Array and The Interval ID
// TODO: Begin by declaring an array to hold your one-time tasks (`oneTimeTasks`) and variables for any interval IDs you'll need for continuous tasks (`monitoringTaskId`).

const oneTimeTasks = [];
let monitoringTaskId;
let readyToLaunchTaskId;
let countdownTaskId;
let oxygenLevel;
let oxygenStatus;
let powerLevel;
let powerStatus;
let communicationsStatus;

// Task 2: Add One-Time Task Function
function addOneTimeTask(func, delay) {
	// TODO: Write a function named `addOneTimeTask` that accepts a function (`func`) and a delay (`delay`) as parameters. This function should add an object containing both parameters into the `oneTimeTasks` array.
	oneTimeTasks.push({ func: func, delay: delay });
}

// Task 3: Run One-Time Tasks Function
function runOneTimeTasks() {
	// TODO: Create a function named `runOneTimeTasks` that iterates over the `oneTimeTasks` array and uses `setTimeout` to schedule each task according to its delay.
	for (oneTimeTask of oneTimeTasks) {
		setTimeout(oneTimeTask.func, oneTimeTask.delay);
	}
}

// Task 4: Start Monitoring Function
function startMonitoring() {
	// TODO: Write a function named `startMonitoring` that uses `setInterval` to simulate continuous monitoring. This function should print a message every few seconds and store the interval ID in `monitoringTaskId`.
	console.log("Begin monitoring");
	monitoringTaskId = setInterval(() => {
		oxygenLevel = Math.random() * 100;
		oxygenStatus = oxygenLevel < 50 ? "Low" : "High";
		powerLevel = Math.random() * 100;
		powerStatus = powerLevel < 50 ? "Low" : "High";
		communicationsStatus = Math.random() < 0.5 ? "Offline" : "Online";

		console.log(
			`Oxygen status: ${oxygenStatus}. Oxygen level: ${oxygenLevel.toFixed(
				0
			)}. Power status: ${powerStatus}. Power level: ${powerLevel.toFixed(
				0
			)}. Communications status: ${communicationsStatus}`
		);

		if (
			oxygenStatus === "High" &&
			powerStatus === "High" &&
			communicationsStatus === "Online"
		) {
			stopMonitoring();
		}
	}, 1000);
}

// Task 5: Stop Monitoring Function
function stopMonitoring() {
	// TODO: Implement a function named `stopMonitoring` that stops the continuous monitoring by using `clearInterval` on `monitoringTaskId`.
	clearInterval(monitoringTaskId);
}

function readyToLaunch() {
	readyToLaunchTaskId = setInterval(() => {
		if (
			oxygenStatus === "High" &&
			powerStatus === "High" &&
			communicationsStatus === "Online"
		) {
			startCountdown(11);
			clearInterval(readyToLaunchTaskId);
		}
	});
}

// Task 6: Start Countdown Function
function startCountdown(seconds) {
	// TODO: Create a function named `startCountdown` that takes a duration parameter. Use `setInterval` to decrease the countdown every second and print the remaining time. Use `clearInterval` to stop the countdown when it reaches zero, printing a "Liftoff!" message.
	console.log("Countdown Started...");
	let timer = seconds;
	countdownTaskId = setInterval(() => {
		timer--;
		console.log(timer);
		if (timer <= 0) {
			launch();
			clearInterval(countdownTaskId);
		}
	}, 1000);
}

function launch() {
	console.log("LAUNCH!!!");
}

// Task 7: Schedule Pre-Launch Activities and Launch
function scheduleMission() {
	// TODO: Use the functions you've created to schedule the pre-launch system check, start and stop monitoring, and execute the countdown. Make sure to adjust the delays appropriately to simulate a real mission timeline.
	addOneTimeTask(startMonitoring, 0);
	addOneTimeTask(readyToLaunch, 5000);
	runOneTimeTasks();
}

scheduleMission(); // Starts the mission.
