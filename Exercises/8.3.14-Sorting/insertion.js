function insertionSort(arr) {
	for (let i = 1; i < arr.length; i++) {
		let temp = arr[i];
		for (let x = i - 1; x >= 0; x--) {
			if (temp < arr[x]) {
				arr[x + 1] = arr[x];
			} else if (temp >= arr[x]) {
				arr[x + 1] = temp;
				break;
			}
			if (x === 0) {
				arr[0] = temp;
			}
		}
	}

	return arr;
}

module.exports = insertionSort;
