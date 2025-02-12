const arr = [98, 23, 12, 10, 8, 5, 4, 3, 2, 1, 0];

console.log(arr.toString());

let swapped = true;

let arrLength = arr.length;

while (arrLength > 1) {
	let i = 0;
	let j = i + 1;
	let bucket = 0;
	while (j < arrLength) {
		if (arr[i] > arr[j]) {
			bucket = arr[i];
			arr[i] = arr[j];
			arr[j] = bucket;
			console.log(arr.toString());
		}
		i++;
		j = i + 1;
	}

	arrLength--;
}
