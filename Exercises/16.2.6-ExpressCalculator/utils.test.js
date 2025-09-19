import { generateResponse } from "./utils";

test("calculates mean correctly", () => {
	const result = generateResponse("1,2,3,4", "mean");
	expect(result.response.status).toBe(200);
	expect(result.response.value).toBe(2.5);
	expect(result.response.operation).toBe("mean");
});
test("calculates mean duplicates correctly", () => {
	const result = generateResponse("1,1,5,7,2,3,4", "mean");
	expect(result.response.status).toBe(200);
	expect(result.response.value).toBeCloseTo(3.2857142857143);
	expect(result.response.operation).toBe("mean");
});
test("calculates mean one large num correctly", () => {
	const result = generateResponse("65737543", "mean");
	expect(result.response.status).toBe(200);
	expect(result.response.value).toBe(65737543);
	expect(result.response.operation).toBe("mean");
});

test("test non-numeric mean", () => {
	const result = generateResponse("a,b,c", "mean");
	expect(result.response.status).toBe(400);
	expect(result.response.operation).toBe(undefined);
	expect(result.response.value).toBe(undefined);
	expect(result.response.error.msg).toBe(
		"One or more values are not numbers"
	);
});
test("test no values mean", () => {
	const result = generateResponse(undefined, "mean");
	expect(result.response.status).toBe(400);
	expect(result.response.operation).toBe(undefined);
	expect(result.response.value).toBe(undefined);
	expect(result.response.error.msg).toBe("No numbers passed");
});

test("test non-numeric median", () => {
	const result = generateResponse("a,b,c", "median");
	expect(result.response.status).toBe(400);
	expect(result.response.operation).toBe(undefined);
	expect(result.response.value).toBe(undefined);
	expect(result.response.error.msg).toBe(
		"One or more values are not numbers"
	);
});
test("test no values median", () => {
	const result = generateResponse(undefined, "median");
	expect(result.response.status).toBe(400);
	expect(result.response.operation).toBe(undefined);
	expect(result.response.value).toBe(undefined);
	expect(result.response.error.msg).toBe("No numbers passed");
});

test("test non-numeric mode", () => {
	const result = generateResponse("a,b,c", "mode");
	expect(result.response.status).toBe(400);
	expect(result.response.operation).toBe(undefined);
	expect(result.response.value).toBe(undefined);
	expect(result.response.error.msg).toBe(
		"One or more values are not numbers"
	);
});
test("test no values mode", () => {
	const result = generateResponse(undefined, "mode");
	expect(result.response.status).toBe(400);
	expect(result.response.operation).toBe(undefined);
	expect(result.response.value).toBe(undefined);
	expect(result.response.error.msg).toBe("No numbers passed");
});
