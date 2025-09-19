import { mean, median, mode } from "simple-statistics";

export const generateResponse = (numsParam, path) => {
	if (!numsParam) {
		return {
			response: {
				status: 400,
				error: {
					msg: "No numbers passed",
				},
			},
		};
	}

	const numsArr = numsParam.split(",").map((val) => parseFloat(val));

	if (numsArr.some(Number.isNaN)) {
		return {
			response: {
				status: 400,
				error: {
					msg: "One or more values are not numbers",
				},
			},
		};
	}

	let response = {
		status: 200,
		operation: path,
	};
	let value = null;
	switch (path) {
		case "mean":
			response.value = mean(numsArr);
			break;
		case "median":
			response.value = median(numsArr);
			break;
		case "mode":
			response.value = mode(numsArr);
			break;
		case "all":
			response.mean = mean(numsArr);
			response.median = median(numsArr);
			response.mode = mode(numsArr);
			break;
		default:
			value = null;
			break;
	}
	return {
		response,
	};
};
