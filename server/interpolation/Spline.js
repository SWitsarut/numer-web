import { gauss_jordan } from '../AXB/gauss-jordan.js'
// import { cramer } from "../AXB/Cramer.js"

// let xy = [{ x: 2, y: 9.5 }, { x: 4, y: 8.0 }, { x: 6, y: 10.5 }, { x: 8, y: 39.5 }, { x: 10, y: 72.5 }];

export function LinearSpline(x, y, targetX) {   
    let X = [...x];
    let Y = [...y];
    let f = [];

    for (let i = 1; i < X.length; i++) {
        const fi = Y[i - 1] + (((Y[i] - Y[i - 1]) / (X[i] - X[i - 1])) * (targetX - X[i - 1]));
        f.push(fi);
    }
    // console.log(f);
    for (let i = 0; i < X.length - 1; i++) {
        if (targetX >= X[i] && targetX <= X[i + 1]) {
            return f[i];
        }
    }
}

export function QuadraticSpline(x, y, targetX) {
    let X = [...x];
    let Y = [...y];
    let i = 0;
    for (i = 0; i < X.length - 4; i++) {
        if (X[i] <= targetX && targetX <= X[i + 1]) {
            break;
        }
    }
    let A = [
        [Math.pow(X[i + 1], 2), X[i + 1], 1],
        [0, 0, 0, X[i + 2] ** 2, X[i + 2], 1],
        [0, 0, 0, X[i + 1] ** 2, X[i + 1], 1],
        [0, 0, 0, 0, 0, 0, X[i + 2] ** 2, X[i + 2], 1],
        [Math.pow(X[i], 2), X[i], 1],
        [0, 0, 0, 0, 0, 0, X[i + 3] ** 2, X[i + 3], 1],
        [2 * X[i + 1], 1, 0, -2 * X[i + 2], -1],
        [0, 0, 0, 2 * X[i + 2], 1, 0, -2 * X[i + 3], -1],
        [1],
    ]

    let B = [
        Y[i + 1],
        Y[i + 1],
        Y[i + 2],
        Y[i + 2],
        Y[i],
        Y[i + 3],
        1e-5,
        1e-5,
        1e-5

    ]
    for (let j = 0; j < A.length; j++) {
        for (let k = 0; k < 9; k++) {
            if (A[j].length < 9) {
                A[j].push(1e-5);
            }
            if (A[j][k] === 0) {
                A[j][k] = 1e-5;
            }
        }
    }

    const abc = gauss_jordan(A, B);
    let inRange;
    for (inRange = 0; inRange < 3; inRange++) {
        if (x >= X[i + inRange] && x <= X[i + inRange + 1]) {
            break;
        }
    }

    // console.log(abc)

    const fx = abc[3 * inRange + 0] * targetX ** 2 + abc[3 * inRange + 1] * x + abc[3 * inRange + 2];
    return fx;
}
// QuadraticSpline(xy, 8)