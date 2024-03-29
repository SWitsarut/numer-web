
// let arr = [[5, 2, 0, 0], [2, 5, 2, 0], [0, 2, 5, 2], [0, 0, 2, 5]];

// let ans = [12, 17, 14, 7];



export function Jacobi(A, B) {


    let arr = [...A];
    let ans = [...B];

    let x = new Array(arr.length).fill(0);
    let xOld = new Array(ans.length).fill(0);

    const epsilon = 1e-3;
    let check = true;

    do {
        // iteration++;
        xOld = [...x];
        for (let i = 0; i < arr.length; i++) {
            let sum = 0;
            for (let j = 0; j < arr[i].length; j++) {
                if (i != j) {
                    sum += arr[i][j] * xOld[j];
                }
            }
            x[i] = (ans[i] - sum) / arr[i][i];
        }
        // console.log({ x, iteration });

        for (let i = 0; i < arr.length; i++) {
            check = check && !(Math.abs((x[i] - xOld[i]) / x[i]) * 100 < epsilon)
        }
    } while (check);

    return x;
}