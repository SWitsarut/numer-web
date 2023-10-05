let arr = [
    [-2, 3, 1],
    [3, 4, -5],
    [1, -2, 1],
];

let ans = [9, 0, -4];
export function inverse(Arr, Ans) {
    let arr = [...Arr];
    let ans = [...Ans]
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (j === i) {
                arr[i].push(1);
            } else {
                arr[i].push(0);
            }
        }
    }

    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let divider = arr[i][i];
        for (let j = i; j < n * 2; j++) {
            arr[i][j] /= divider;
        }

        for (let j = 0; j < n; j++) {
            if (j !== i) {
                let firstElement = arr[j][i];
                for (let k = i; k < n * 2; k++) {
                    arr[j][k] -= firstElement * arr[i][k];
                }
            }
        }
    }



    let inverseMatrix = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = n; j < n * 2; j++) {
            row.push(arr[i][j]);
        }
        inverseMatrix.push(row);
    }


    // console.log(inverseMatrix)
    function Mul(A, B) {
        const result = [];
        for (let i = 0; i < A.length; i++) {
            let sum = 0;
            for (let j = 0; j < B.length; j++) {
                sum += A[i][j] * B[j];
            }
            result.push(sum);
        }
        return result;
    }
    const solution = Mul(inverseMatrix, ans);
    return solution;


}

console.log(inverse(arr, ans))