



export default function gauss_seidel(A, B) {
    let arr = [...A];
    let ans = [...B];
    let x = new Array(ans.length).fill(0);
    let xOld = [...x];

    const epsilon = 0.001;
    let check = true;
    let iteration = -1;

    do {
        iteration++;
        xOld = [...x];
        for (let i = 0; i < arr.length; i++) {
            let sum = 0;
            for (let j = 0; j < arr[i].length; j++) {
                if (i != j) {
                    sum += arr[i][j] * x[j];
                }
            }
            if (arr[i][i] === 0) {
                x[i] = (ans[i] - sum) / 1e-9;
            } else {
                x[i] = (ans[i] - sum) / arr[i][i];
            }
        }
        console.log({ x, iteration });

        for (let i = 0; i < arr.length; i++) {
            check = check && !(Math.abs((x[i] - xOld[i]) / x[i]) * 100 < epsilon)
        }
    } while (check && iteration <= 1000);
    return x;
}