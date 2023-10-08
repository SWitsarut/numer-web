let A = [[5, 2, 0, 0], [2, 5, 2, 0], [0, 2, 5, 2], [0, 0, 2, 5]];

let B = [12, 17, 14, 7];

let X = [0, 0, 0, 0];
let xOld = [0, 0, 0, 0];

const epsilon = 0.000001;
let check = true;
let iteration = 0;
let err;
let D = 0;
iteration = 0;

do {
    iteration++;
    D = findD(iteration, A, X, B);
    err = 0;//asdasd
} while (err < epsilon);


function findR(A, X, B) {
    let res = multiplyMatrices(A, X)
    return subtractMatrices(res, B)
}

function findAlpha(A, X, B, D) {
    return multiplyMatrices(multiplyMatrices(transpose(findR(A, X, B)), A), D)[0];
}

function findD(i, A, X, B, prevD) {
    let R = findR(A, X, B);
    if (i > 1) {
        let alpha = findAlpha(A, X, B)
        return multiplyMatrixByScalar(R, -1) + multiplyMatrices(alpha, prevD);
    } else {
        return multiplyMatrixByScalar(R, -1);
    }
}

function findLamda(A, X, B) {
    let res;
    // return;
}

// function findX(x) {

// }

function checkErr(R) {
    return
}

function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Create a new matrix to store the transpose
    const result = new Array(cols).fill(null).map(() => new Array(rows));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }

    return result;
}
function multiplyMatrixByScalar(matrix, scalar) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Create a new matrix to store the result
    const result = new Array(rows).fill(null).map(() => new Array(cols));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[i][j] = matrix[i][j] * scalar;
        }
    }

    return result;
}

function multiplyMatrices(matrix1, matrix2) {
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const rows2 = matrix2.length;
    const cols2 = matrix2[0].length;

    if (cols1 !== rows2) {
        throw new Error("Matrix dimensions are incompatible for multiplication");
    }

    // Create a new matrix to store the result
    const result = new Array(rows1).fill(null).map(() => new Array(cols2));

    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols2; j++) {
            result[i][j] = 0;
            for (let k = 0; k < cols1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}

function subtractMatrices(matrix1, matrix2) {
    const rows1 = matrix1.length;
    const cols1 = matrix1[0].length;
    const rows2 = matrix2.length;
    const cols2 = matrix2[0].length;

    if (rows1 !== rows2 || cols1 !== cols2) {
        throw new Error("Matrix dimensions are incompatible for subtraction");
    }

    // Create a new matrix to store the result
    const result = new Array(rows1).fill(null).map(() => new Array(cols1));

    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < cols1; j++) {
            result[i][j] = matrix1[i][j] - matrix2[i][j];
        }
    }

    return result;
}
