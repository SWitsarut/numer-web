// let arr = [{ x: 0, y: 9.81 }, { x: 80000, y: 9.5682 }];
// let arr = [{ x: 0, y: 9.81 }, { x: 40000, y: 9.6879 }, { x: 80000, y: 9.5682 }];
export function Langange(x, y, targetX) {


    let X = [...x];
    let Y = [...y];
    let L = [];

    function getL(k, x) {
        let topProd = 1;
        for (let i = 0; i < x.length; i++) {
            if (i != k) {
                topProd *= (X[i] - x);
            }
        }

        let botProd = 1;
        for (let i = 0; i < X.length; i++) {
            if (i != k) {
                botProd *= (X[i] - X[k]);
            }
        }

        console.log(k, topProd, botProd);
        let ans;
        if (botProd != 0) {
            ans = topProd / botProd;
        } else {
            ans = topProd / 1e-9;
        }
        return ans;
    }


    for (let i = 0; i < X.length; i++) {
        L.push(getL(i, targetX))
    }
    // console.log(L)

    function findX() {
        let sum = 0;
        for (let i = 0; i < Y.length; i++) {
            sum += L[i] * Y[i];
        }
        return sum;
    }
    return findX();
}