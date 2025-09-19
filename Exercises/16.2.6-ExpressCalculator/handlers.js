import { generateResponse } from "./utils.js";

export const createMathHandler = (operation) => (req, res) => {
	const numsParam = req.query.nums;
	const response = generateResponse(numsParam, operation);
	res.status(response.response.status).json(response);
};
