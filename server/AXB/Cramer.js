import { det } from "mathjs";


// function getDeterminant(matrix) {
//     const size = matrix.length;

//     // Base case for 2x2 matrix
//     if (size === 2) {
//         return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
//     }

//     let det = 0;
//     for (let i = 0; i < size; i++) {
//         const subMatrix = [];
//         for (let j = 1; j < size; j++) {
//             const row = [];
//             for (let k = 0; k < size; k++) {
//                 if (k !== i) {
//                     row.push(matrix[j][k]);
//                 }
//             }
//             subMatrix.push(row);
//         }
//         det += matrix[0][i] * getDeterminant(subMatrix) * (i % 2 === 0 ? 1 : -1);
//     }

//     return det;
// }
function replaceColumn(matrix, vector, col) {
    const sizeMatrix = matrix.length;
    const sizeVector = vector.length;
    const tempMatrix = matrix.map((row) => [...row]);

    if (sizeVector !== sizeMatrix) {
        return null;
    }

    for (let i = 0; i < sizeVector; i++) {
        tempMatrix[i][col] = vector[i];
    }

    return tempMatrix;
}

export function Cramer(matrix, vector) {
    const originalDet = det(matrix);
    const solutions = [];
    for (let i = 0; i < matrix.length; i++) {
        const modifiedMatrix = replaceColumn(matrix, vector, i);
        const determinant = det(modifiedMatrix);
        let solution
        if (originalDet !== 0) {
            solution = determinant / originalDet
        } else {
            solution = determinant / 1e-6;
        }
        solutions.push(solution);
    }
    console.log("data", solutions)
    console.log(solutions)
    return solutions;
}

