
export function Newton(Arr, x) {

    let arr = Arr;
    let C = [];

    function getC(xl, xr) {
        if (xl == xr) {
            return arr[xl].y;
        }
        else {
            return (getC(xl, xr + 1) - getC(xl - 1, xr)) / (arr[xl].x - arr[xr].x);
        }
    }
    function fx(x) {
        let result = C[0];
        let term = 1;

        for (let i = 1; i < C.length; i++) {
            term *= (x - arr[i - 1].x);
            result += C[i] * term;
        }

        return result;
    }

    C.push(arr[0].y);
    for (let i = 1; i < arr.length; i++) {
        C.push(getC(i, 0));
    }

    return fx(x)
}