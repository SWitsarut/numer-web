import { gauss_jordan, gaussJordan } from '../AXB/gauss-jordan.js'
import { cramer } from "../AXB/Cramer.js"

let xy = [{ x: 2, y: 9.5 }, { x: 4, y: 8.0 }, { x: 6, y: 10.5 }, { x: 8, y: 39.5 }, { x: 10, y: 72.5 }];

export function LinearSpline(xy, x) {
    let point = [...xy];
    let f = [];

    for (let i = 1; i < point.length; i++) {
        const fi = point[i - 1].y + (((point[i].y - point[i - 1].y) / (point[i].x - point[i - 1].x)) * (x - point[i - 1].x));
        f.push(fi);
    }
    console.log(f);
    for (let i = 0; i < point.length - 1; i++) {
        if (x >= point[i].x && x <= point[i + 1].x) {
            return f[i];
        }
    }
}

export function QuadraticSpline(xy, x) {
    let point = [...xy];
    let i = 0;
    for (i = 0; i < point.length - 4; i++) {
        if (point[i].x <= x && x <= point[i + 1].x) {
            break;
        }
    }
    let A = [
        [Math.pow(point[i + 1].x, 2), point[i + 1].x, 1],
        [0, 0, 0, point[i + 2].x ** 2, point[i + 2].x, 1],
        [0, 0, 0, point[i + 1].x ** 2, point[i + 1].x, 1],
        [0, 0, 0, 0, 0, 0, point[i + 2].x ** 2, point[i + 2].x, 1],
        [Math.pow(point[i].x, 2), point[i].x, 1],
        [0, 0, 0, 0, 0, 0, point[i + 3].x ** 2, point[i + 3].x, 1],
        [2 * point[i + 1].x, 1, 0, -2 * point[i + 2].x, -1],
        [0, 0, 0, 2 * point[i + 2].x, 1, 0, -2 * point[i + 3].x, -1],
        [1],
    ]

    let B = [
        point[i + 1].y,
        point[i + 1].y,
        point[i + 2].y,
        point[i + 2].y,
        point[i].y, 
        point[i + 3].y,
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
        if (x >= point[i + inRange].x && x <= point[i + inRange + 1].x) {
            break;
        }
    }

    console.log(abc)

    const fx = abc[3 * inRange + 0] * x ** 2 + abc[3 * inRange + 1] * x + abc[3 * inRange + 2];
    return fx;
}
console.log("ans", QuadraticSpline(xy, 8.5));
// QuadraticSpline(xy, 8)