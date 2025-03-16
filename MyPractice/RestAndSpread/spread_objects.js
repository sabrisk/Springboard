const tea = {
	type: "oolong",
	name: "winter sprout",
	origin: "taiwan",
};

const teaData = {
	steepTime: "30s",
	brewTemp: 175,
	origin: "japan",
};

// const tea2 = { ...tea };

const teaTin = { ...tea, price: 22.99 };

// const newTea = { ...tea, name: 'golden frost' };
const newTea = { name: "golden frost", ...tea };

const fullTea = { ...tea, ...teaData };

const colors = ["red", "orange", "blue"];
const dummyObj = { ...colors, ..."CAT" };

const splitGroups = (stringToSplit) => {
	const result = stringToSplit.split("").reduce((accumulator, currVal) => {
		const accLength = accumulator.length;

		if (accLength === 0) {
			accumulator.push(currVal);
		} else {
			const accLastIndex = accLength - 1;
			const accLastVal = accumulator[accLastIndex];
			const accLastDigit = accLastVal[accLastVal.length - 1];

			if (accLastDigit !== currVal) {
				accumulator.push(currVal);
			} else {
				accumulator[accLastIndex] += currVal;
			}
		}

		return accumulator;
	}, []);
	return result;
};

const splitGroups2 = (stringToSplit) => {
	const splitString = stringToSplit.split("");
	let currGroupIdx = 0;
	const groupsArr = [];

	if (!stringToSplit.length) {
		return "";
	}

	groupsArr.push(splitString[0]);

	for (let i = 1; i < splitString.length; i++) {
		if (
			groupsArr[currGroupIdx][groupsArr[currGroupIdx].length - 1] ===
			splitString[i]
		) {
			groupsArr[currGroupIdx] += splitString[i];
		} else {
			groupsArr.push(splitString[i]);
			currGroupIdx++;
		}
	}
	return groupsArr;
};

function splitGroups(s) {
	let count = 1;
	const res = [];
	for (let i = 0; i < s.length; i++) {
		if (s[i] === s[i + 1]) count++; // continue streak
		else {
			res.push(s[i].repeat(count));
			count = 1; //reset streak
		}
	}
	return res;
}
