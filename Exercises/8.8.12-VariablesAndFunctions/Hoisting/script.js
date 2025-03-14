/* Task 1: Declare a Destination Variable */
// TODO: Use `let` to declare a variable named `destination` and assign it the value `"Ancient Egypt"`. Print the destination to the console.

let destination = "Ancient Egypt";
console.log(destination);

/* Task 2: Change the Destination */
// TODO: Now, change the `destination` variable to `"Medieval Europe"`. Print the new destination to the console.

destination = "Medieval Europe";
console.log(destination);

/* Task 3: Declare a Constant Travel Date */
// TODO: Use `const` to declare a variable named `travelDate` and set it to `"2024-03-15"`. Try to change the `travelDate` to another value and observe and explain what happens as a comment.

// const travelDate = "2024-03-15";
// travelDate = "2024-03-16";

/*
 * Observations:
 * TODO: Explain here.
 *
 * Attempting to reassign a value to a variable
 * declared as const results in an error. Variables declared
 * as const throw an error when you attempt to reassign them.
 * You can mutate objects declared as const, but you can't
 * reassign what object or primitive the variable is assigned.
 */

/* Task 4: Experiment with Variable Hoisting */
// TODO: Before declaring any variable, try to print a variable named `timeMachineModel` to the console. Then, declare `timeMachineModel` using `var` and assign it the value `"T-800"`. Observe and explain what happens as a comment.

console.log(timeMachineModel);
var timeMachineModel = "T-800";
console.log(timeMachineModel);
/*
 * Observations:
 * TODO: Explain here.
 *
 * Inititally, I was asked to log timeMachineModel variable before
 * declaring any variable. Then I was asked to declar it using var.
 * However, given this situation, only the declaration of timeMachineModel
 * gets hoisted, not the assignment. Therefore, even though timeMachineModel
 * has been declared prior to the console.log, since the assignment hasn't
 * occured yet, it logs undefined to the console. If you log the variable
 * after the assignment, it works as expected.
 */

//
