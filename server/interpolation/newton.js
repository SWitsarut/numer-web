
export function Newton_interpolation(x, y, targetX) {


    let X = [...x];
    let Y = [...y];
    let C = [];

    function getC(xl, xr) {
        if (xl == xr) {
            return Y[xl];
        }
        else {
            return (getC(xl, xr + 1) - getC(xl - 1, xr)) / (X[xl] - X[xr]);
        }
    }
    function fx(x) {
        let result = C[0];
        let term = 1;

        for (let i = 1; i < C.length; i++) {
            term *= (x - X[i - 1]);
            result += C[i] * term;
        }

        return result;
    }

    C.push(Y[0]);
    for (let i = 1; i < Y.length; i++) {
        C.push(getC(i, 0));
    }
    
    return fx(targetX)
}


// let xArr = [0, 20000, 40000, 60000, 80000];
// let yArr = [9.81, 9.7487, 9.6879, 9.6879, 9.5682]
// let x = 42235;
// console.log(Newton(xArr, yArr, x));