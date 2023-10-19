import { Cramer } from "../AXB/Cramer.js";

let x = [10, 15, 20, 30, 40, 50, 60, 70, 80];
let y = [5, 9, 15, 18, 22, 30, 35, 38, 43];


let targetX = 5;

function Least_Square_Linear(x, y, targetX) {

    let xySum = 0;
    let xSum = 0;
    let ySum = 0;
    let x2Sum = 0;
    for (let i = 0; i < x.length; i++) {
        xySum += x[i] * y[i];
        xSum += x[i];
        ySum += y[i];
        x2Sum += Math.pow(x[i], 2);
    }
    const n = x.length;

    let matrix = [[n, xSum], [xSum, x2Sum]];
    let ans = [ySum, xySum];

    let a = Cramer(matrix, ans);
    let fx = 0;
    for (let i = 0; i < a.length; i++) {
        fx += a[i] * Math.pow(targetX, i);
    }
    return fx;
}

function Least_Square_Polynomial(m, x, y, targetX) {
    let matrix = [];
    for (let i = 0; i < m; i++) {
        matrix.push([]);
        for (let j = 0; j < m; j++) {
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
    for (let i = 0; i < m; i++) {
        let sum = 0;
        for (let j = 0; j < y.length; j++) {
            sum += Math.pow(x[j], i) * y[j];
        }
        matrixB.push(sum);
    }
    let a = Cramer(matrix, matrixB);
    let fx = 0;
    for (let i = 0; i < a.length; i++) {
        fx += a[i] * Math.pow(targetX, i);
    }
    return fx;
}

console.log(Least_Square_Linear(x, y, targetX))
console.log(Least_Square_Polynomial(2, x, y, targetX))

