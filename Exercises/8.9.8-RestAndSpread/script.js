/* Task 1: Track Animal Sightings */
// TODO: Write a function with rest parameters to print sightings of different animals within the sanctuary. This function should accept an arbitrary number of animal names.

function trackAnimalSightings(...animals) {
	console.log(`Animal Sightings: ${animals}`);
}

trackAnimalSightings("moose", "chicken", "horse");

/* Task 2: Merge Habitat Areas */
const forestHabitats = ["Forest A", "Forest B"];
const savannahHabitats = ["Savannah C", "Savannah D"];
// TODO: You are given two arrays of habitat names. Use the spread operator to combine them into a comprehensive list of protected areas within the sanctuary.

const mergedHabitats = [...forestHabitats, ...savannahHabitats];
console.log(`Merged habitats: ${mergedHabitats}`);

/* Task 3: Update Conservation Status */
const rhinoStatus = {
	population: 500,
	status: "Endangered",
};
// TODO: You are given an object representing an animal's conservation status. Use the spread operator to update this status with new information, such as an increase in population or a change in habitat.
console.log("Old Rhino Status:", rhinoStatus);
const rhinoStatus2 = { ...rhinoStatus, population: 1000 };
console.log("Updated Rhino Status:", rhinoStatus2);

/* Task 4: Catalog Genetic Diversity */
const lionProfile = {
	name: "Leo",
	age: 5,
	species: "Lion",
};

// TODO: Duplicate an animal profile object using a shallow copy. Add genetic diversity information using the `genetics` property to this copy. Observe and explain how changes to nested properties affect both the original and the copied object.

const lionProfile2 = {
	...lionProfile,
	genetics: "Extra hairy",
};

console.log("Original Lion Profile:", lionProfile);
console.log("Updated Lion Profile:", lionProfile2);

/*
 * Observations:
 * TODO: Explain here.
 *
 *  When you make a shallow copy like this,
 * changing or adding a property only changes it in the copy.
 *
 */

/* Task 5: Analyze Ecosystem Health */
const ecosystemHealth = {
	waterQuality: "Good",
	foodSupply: {
		herbivores: "Abundant",
		carnivores: "Sufficient",
	},
};

const updatedEcosystemHealth = { ...ecosystemHealth };
updatedEcosystemHealth.foodSupply.herbivores = "Plentiful";

console.log("Original Ecosystem Health:", ecosystemHealth);
console.log("Updated Ecosystem Health:", updatedEcosystemHealth);

console.log(ecosystemHealth.foodSupply === updatedEcosystemHealth.foodSupply);
/*
 * Observations:
 * Modifying a nested property in a shallow copy also affects the original object.
 * This occurs because the spread operator performs a shallow copy, meaning that nested objects are not duplicated but rather reference the same object in memory.
 */
