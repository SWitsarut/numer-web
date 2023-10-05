
let arr = [{ x: 0, y: 9.81 }, { x: 20000, y: 9.7487 }, { x: 40000, y: 9.6879 }, { x: 60000, y: 9.6879 }, { x: 80000, y: 9.5682 }];
let C = [];
 
function getC(xl, xr) {
    if (xl == xr) {
        return arr[xl].y;
    }
    else {
        return (getC(xl, xr + 1) - getC(xl - 1, xr)) / (arr[xl].x - arr[xr].x);
    }
}

// function fx(x) {
//     return (C[0] +
//         C[1] * (x - arr[0].x) +
//         C[2] * (x - arr[0].x) * (x - arr[1].x) +
//         C[3] * (x - arr[0].x) * (x - arr[1].x) * (x - arr[2].x) +
//         C[4] * (x - arr[0].x) * (x - arr[1].x) * (x - arr[2].x) * (x - arr[3].x));
// }
function fx(x) {
    let result = C[0];
    let term = 1;

    for (let i = 1; i < C.length; i++) {
        term *= (x - arr[i - 1].x);
        result += C[i] * term;
    }

    return result;
}

// C0 + C1(x - x0) + C2(x - x0)(x - x1) + C3(x - x0)(x - x1)(x - x2) + C4(x - x0)(x - x1)(x - x2)(x - x3);


C.push(arr[0].y);
for (let i = 1; i < arr.length; i++) {
    C.push(getC(i, 0));
}

console.log(fx(42235))
