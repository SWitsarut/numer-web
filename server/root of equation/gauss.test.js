let arr = [
	[-2, 3, 1],
	[3, 4, -5],
	[1, -2, 1],
];
let ans = [9, 0, -4];

for (let i = 0; i < arr.length; i++) {
	arr[i].push(ans[i]);
}

let n = arr.length;
for (let i = 0; i < n; i++) {
	//1st element to 1
	let divider = arr[i][i];
	for (let j = i; j < n + 1; j++) {
		arr[i][j] /= divider;
	}

	// divide other
	for (let j = i + 1; j < n; j++) {
		let firstElement = arr[j][i];
		for (let k = i; k < n + 1; k++) {
			arr[j][k] -= firstElement * arr[i][k];
		}
	}
}
console.log(arr);
for (let i = n - 1; i >= 0; i--) {
	// Solve for the current variable
	for (let j = i - 1; j >= 0; j--) {
		let factor = arr[j][i];
		arr[j][n] -= factor * arr[i][n];
	}
}
let answer = arr.map((row) => row[n]);
console.log(answer);
