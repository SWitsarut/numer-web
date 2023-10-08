function getDeterminant(matrix) {
    let det = 0;
    const size = matrix.length;

    // Calculate the determinant using the formula
    for (let i = 0; i < size; i++) {
        let product = 1;
        for (let j = 0; j < size; j++) {
            const element = matrix[j][(i + j) % size];
            product *= element;
        }
        det += product;
    }

    for (let i = 0; i < size; i++) {
        let product = 1;
        for (let j = size - 1; j >= 0; j--) {
            const element = matrix[j][(i + (size - j - 1)) % size];
            product *= element;
        }
        det -= product;
    }

    return det;
}

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
    const originalDet = getDeterminant(matrix);
    const solutions = [];

    for (let i = 0; i < matrix.length; i++) {
        const modifiedMatrix = replaceColumn(matrix, vector, i);
        const determinant = getDeterminant(modifiedMatrix);

        const solution = determinant / originalDet;
        solutions.push(solution);
    }

    return solutions;
}

