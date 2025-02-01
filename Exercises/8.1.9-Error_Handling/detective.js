function mysteryOperation() {

	const outcome = Math.random(); // Generates a random number between 0 and 1.

	if (outcome < 0.5) {
		console.log("The operation is completed successfully!");
	}
	else {
		throw new Error("The operation is failed mysteriously!");
	}
}


const OPERATIONS_ATTENDED = 20;
const VACATION_DAYS_FOR_SUCCESS = 13;
const VACATION_DAYS_FOR_FAILURE = 1;
const DAY_REWARD_PER_ATTENDANCE = 3;

let vacationDays = 0;

for (let i = 0; i < OPERATIONS_ATTENDED; i++) {
	try {
		mysteryOperation();
		vacationDays += VACATION_DAYS_FOR_SUCCESS;
	} catch (err) {
		vacationDays += VACATION_DAYS_FOR_FAILURE;
	} finally {
		vacationDays += DAY_REWARD_PER_ATTENDANCE;
	}
}
console.log("Vacation days earned: ", vacationDays);