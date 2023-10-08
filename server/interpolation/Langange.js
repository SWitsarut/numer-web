// let arr = [{ x: 0, y: 9.81 }, { x: 80000, y: 9.5682 }];
// let arr = [{ x: 0, y: 9.81 }, { x: 40000, y: 9.6879 }, { x: 80000, y: 9.5682 }];
export function Langange(Arr, x) {


    let arr = [...Arr];
    let L = [];
    let targetX = x;

    function getL(k, x) {
        let topProd = 1;
        for (let i = 0; i < arr.length; i++) {
            if (i != k) {
                topProd *= (arr[i].x - x);
            }
        }

        let botProd = 1;
        for (let i = 0; i < arr.length; i++) {
            if (i != k) {
                botProd *= (arr[i].x - arr[k].x);
            }
        }

        console.log(k, topProd, botProd);
        return topProd / botProd;
    }


    for (let i = 0; i < arr.length; i++) {
        L.push(getL(i, targetX))
    }
    // console.log(L)

    function findX() {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += L[i] * arr[i].y;
        }
        return sum;
    }
    return findX();
}