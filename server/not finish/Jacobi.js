


let arr = [[5, 2, 0, 0], [2, 5, 2, 0], [0, 2, 5, 2], [0, 0, 2, 5]];

let ans = [12, 17, 14, 7];

export function Jacobi(A, B) {
    let arr = [...A];
    let ans = [...B];

    let x = new Array(arr.length);
    let xOld = new Array(arr.length);

    const epsilon = 1e-3;
    let check = true;
    let iteration = 0;

    do {
        iteration++;
        xOld = [...x];
        for (let i = 0; i < arr.length; i++) {
            let sum = 0;
            for (let j = 0; j < arr[i].length; j++) {
                if (i != j) {
                    sum += arr[i][j] * xOld[j];
                }
            }
            if (arr[i][i] != 0) {
                x[i] = (ans[i] - sum) / arr[i][i];
            } else {
                x[i] = (ans[i] - sum) / 1e-9;
            }
        }
        console.log({ x, iteration });

        for (let i = 0; i < arr.length; i++) {
            check = check && !(Math.abs((x[i] - xOld[i]) / x[i]) * 100 < epsilon)
        }
    } while (check);
}
Jacobi(arr, ans);