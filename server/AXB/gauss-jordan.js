export function gauss_jordan(matrix, matrix2) {
    const rows = matrix.length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][j] = 1e-9;
            }
        }
        if (matrix2[i] == 0) {
            matrix2[i] = 1e-9;
        }
    }
    for (let i = 0; i < rows; i++) {
        let divider = matrix[i][i];

        if (divider === 0) {
            divider = 1e-9;
        }

        for (let j = i; j < rows; j++) {
            matrix[i][j] /= divider;
        }
        matrix2[i] /= divider;

        for (let j = 0; j < rows; j++) {
            if (i === j) continue;
            let factor = matrix[j][i];
            for (let k = i; k < rows; k++) {
                matrix[j][k] -= factor * matrix[i][k];
            }
            matrix2[j] -= factor * matrix2[i];
        }
    }
    return matrix2;
}



export function gaussJordanOneValue(Arr) {
    let arr = [...Arr];

    for (let i = 0; i < arr.length; i++) {
        // 1st element to 1
        let divider = arr[i][i];
        for (let j = i; j < arr[i].length; j++) {
            arr[i][j] /= divider;
        }

        // divide others
        for (let j = 0; j < arr.length; j++) {
            if (j !== i) {
                let firstElement = arr[j][i];
                for (let k = i; k < arr[i].length; k++) {
                    arr[j][k] -= firstElement * arr[i][k];
                }
            }
        }
    }
    return arr;
}
