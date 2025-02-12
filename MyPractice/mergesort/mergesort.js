function merge(arr1, arr2) {
	const outArr = [];

	let i = 0;
	let x = 0;

	while (i < arr1.length && x < arr2.length) {
		if (arr1[i] < arr2[x]) {
			outArr.push(arr1[i]);
			i++;
		} else {
			outArr.push(arr2[x]);
			x++;
		}
	}

	outArr.push(...arr1.slice(i));
	outArr.push(...arr2.slice(x));

	return outArr;
}

function mergeSort(arr) {
	if (arr.length < 2) return arr;
	const mid = Math.floor(arr.length / 2);
	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid));
	return merge(left, right);
}
