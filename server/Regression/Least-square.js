import { Cramer } from "../AXB/Cramer";

// function Least_Square_Linear(x, y, targetX) {

//     let xySum = 0;
//     let xSum = 0;
//     let ySum = 0;
//     let x2Sum = 0;
//     for (let i = 0; i < x.length; i++) {
//         xySum += x[i] * y[i];
//         xSum += x[i];
//         ySum += y[i];
//         x2Sum += Math.pow(x[i], 2);
//     }
//     const n = x.length;
//     let matrix = [[n, xSum], [xSum, x2Sum]];
//     let ans = [ySum, xySum];

//     // console.log(matrix);
//     // console.log(ans);
//     let a = Cramer(matrix, ans);
//     let fx = 0;
//     for (let i = 0; i < a.length; i++) {
//         fx += a[i] * Math.pow(targetX, i);
//     }
//     return fx;
// }

function Least_Square_Polynomial(m, x, y, targetX) {
    let matrix = [];
    for (let i = 0; i < m + 1; i++) {
        matrix.push([]);
        for (let j = 0; j < m + 1; j++) {
            let sum = 0;
            for (let k = 0; k < x.length; k++) {
                if (i === 0 && j === 0) {
                    sum += 1;
                } else {
                    sum += Math.pow(x[k], i + j);
                }
            }
            matrix[i].push(sum);
        }
    }
    let matrixB = [];
    for (let i = 0; i < m + 1; i++) {
        let sum = 0;
        for (let j = 0; j < y.length; j++) {
            sum += Math.pow(x[j], i) * y[j];
        }
        matrixB.push(sum);
    }
    // console.log(matrix)
    // console.log(matrixB)
    let a = Cramer(matrix, matrixB);
    let fx = 0;
    for (let i = 0; i < a.length; i++) {
        fx += a[i] * Math.pow(targetX, i);
    }
    return fx;
}



function Least_Square_Multiple() {
    let x = [[1, 0, 2, 3, 4, 2, 1], [0, 1, 4, 2, 1, 3, 6], [1, 3, 1, 2, 5, 3, 4]];
    let y = [4, -5, -6, 0, -1, -7, -20];
    let matrix = [];
    let n = x[0].length;
    for (let i = 0; i < x.length + 1; i++) {
        matrix.push([]);
        for (let j = 0; j < x.length + 1; j++) {
            let sum = 0;
            for (let k = 0; k < n; k++) {
                let prod = 1;
                if (i != 0) {
                    prod *= x[i - 1][k];

                } if (j != 0) {
                    prod *= x[j - 1][k];
                }
                sum += prod;
            }
            matrix[i].push(sum);
        }
    }

    console.log(matrix)
    let matrixB = [];
    for (let i = 0; i < x.length + 1; i++) {
        let sum = 0;
        for (let j = 0; j < y.length; j++) {
            if (i == 0) {
                sum += y[j];
            } else {
                sum += y[j] * x[i - 1][j];
            }
        }
        matrixB.push(sum);
    }
    console.log(matrixB)
    // return fx;
    console.log(Cramer(matrix, matrixB))
}

export { Least_Square_Polynomial, Least_Square_Multiple }
// console.log(
//     Least_Square_Linear(x, y, targetX),
//     Least_Square_Polynomial(3, x, y, targetX)
// )
