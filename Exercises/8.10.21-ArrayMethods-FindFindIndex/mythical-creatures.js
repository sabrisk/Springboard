const mythicalCreatures = [
	{ name: "Dragon", type: "Fire", lastSeen: "Volcano Valley" },
	{ name: "Mermaid", type: "Water", lastSeen: "Coral Caves" },
	{ name: "Unicorn", type: "Land", lastSeen: "Enchanted Forest" },
	{ name: "Griffin", type: "Air", lastSeen: "Highwind Mountains" },
	{ name: "Kraken", type: "Water", lastSeen: "Abyssal Depths" },
];

const firstWaterCreature = mythicalCreatures.find((creature) => {
	if (creature.type === "Water") return true;
});

console.log(`The first water creatures is ${firstWaterCreature.name}`);

const griffinIndex = mythicalCreatures.findIndex((creature) => {
	if (creature.name === "Griffin") return true;
});

console.log(`The index of the griffin is ${griffinIndex}`);

const lastSeenEnchantedForest = mythicalCreatures.find((creature) => {
	if (creature.lastSeen === "Enchanted Forest") return true;
});

console.log(
	`The first creature last seen in Enchanted Forest is the ${lastSeenEnchantedForest.name}`
);
