function getDet(matrix) {
	let det = 0;
	const size = matrix.length;
	//add
	for (let i = 0; i < size; i++) {
		let product = 1;
		for (let j = 0; j < size; j++) {
			const element = matrix[j][(i + j) % 3];
			product *= element;
		}
		det += product;
	}
	//sub
	for (let i = 0; i < size; i++) {
		let product = 1;
		for (let j = size - 1; j >= 0; j--) {
			const element = matrix[j][(i + (size - j - 1)) % 3];
			product *= element;
		}
		det -= product;
	}
	return det;
}

function replaceCol(arr, ans, col) {
	const sizeArr = arr.length;
	const sizeAns = ans.length;
	let tempArr = arr.map((row) => [...row]);
	if (sizeAns !== sizeArr) {
		return -1;
	}
	for (let i = 0; i < sizeAns; i++) {
		tempArr[i][col] = ans[i];
	}
	return tempArr;
}
//main
let arr = [
	[-2, 3, 1],
	[3, 4, -5],
	[1, -2, 1],
];
let ans = [9, 0, -4];
const orginalDet = getDet(arr);
for (let i = 0; i < 3; i++) {
	const newMatrix = getDet(replaceCol(arr, ans, i));
	// console.log(replaceCol(arr, ans, i), newMatrix);
	console.log(`x${i + 1} = ${newMatrix / orginalDet}`);
}
