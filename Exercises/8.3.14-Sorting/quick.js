/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, startIdx, endIdx) {
	let pivotIdx = 0;
	let countLeft = 0;

	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[pivotIdx]) {
			countLeft++;
		}
	}
	return countLeft;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort() {}

module.exports = quickSort;
