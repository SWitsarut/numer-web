export default function LU(A, B) {



    let matrix = [...A];

    let ans = [...B];

    let upper = matrix.map(row => [...row]);
    let lower = new Array(3).fill(0).map(() => new Array(3).fill(0));

    for (let i = 0; i < upper.length; i++) {
        let factor = upper[i][i];
        for (let j = 0; j < upper[i].length; j++) {
            upper[i][j] /= factor;
        }
        lower[i][i] = factor;

        for (let j = i + 1; j < upper.length; j++) {
            let factor = upper[j][i];
            for (let k = 0; k < upper[j].length; k++) {
                upper[j][k] -= factor * upper[i][k];
            }
            lower[j][i] = factor;
        }
    }

    // LY = B
    let y = new Array(3).fill(0);
    for (let i = 0; i < lower.length; i++) {
        let sum = 0;
        for (let j = 0; j < i; j++) {
            sum += lower[i][j] * y[j];
        }
        y[i] = (ans[i] - sum) / lower[i][i];
    }

    // Ux = Y
    let x = new Array(3).fill(0);
    for (let i = upper.length - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < upper[i].length; j++) {
            sum += upper[i][j] * x[j];
        }
        x[i] = y[i] - sum;
    }
    // console.log(x)
    return x;
}
// function printMatrix(matrix) {
//     for (let i = 0; i < matrix.length; i++) {
//         let row = "| ";
//         for (let j = 0; j < matrix[i].length; j++) {
//             row += matrix[i][j] + " ";
//         }
//         row += "|";
//         console.log(row);
//     }
// }
