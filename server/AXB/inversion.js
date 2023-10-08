export function inverse(matrix, vector) {
    const n = matrix.length;
    const augmentedMatrix = [];

    // Create an augmented matrix [matrix | identity]
    for (let i = 0; i < n; i++) {
        augmentedMatrix.push([...matrix[i], ...(i === 0 ? [1] : new Array(n).fill(0))]);
    }

    // Perform Gaussian elimination to get the inverse
    for (let i = 0; i < n; i++) {
        const pivot = augmentedMatrix[i][i];

        // Check for a pivot element that is too close to zero
        if (Math.abs(pivot) < 1e-9) {
            throw new Error('Matrix is singular; it does not have an inverse.');
        }

        for (let j = 0; j < 2 * n; j++) {
            augmentedMatrix[i][j] /= pivot;
        }

        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const factor = augmentedMatrix[k][i];
                for (let j = 0; j < 2 * n; j++) {
                    augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
                }
            }
        }
    }

    // Extract the inverse matrix from the right half of the augmented matrix
    const inverseMatrix = augmentedMatrix.map((row) => row.slice(n));

    // Perform matrix multiplication to get the solution
    const solution = [];
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
            sum += inverseMatrix[i][j] * vector[j];
        }
        solution.push(sum);
    }

    return solution;
}


