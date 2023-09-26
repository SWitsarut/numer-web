const fn = (x) => {
    return Math.pow(x, 2) - 7;
};
let xi;
let xi_1 = 1;
let xi_2 = 7;
let iteration = 0;
const epsilon = 0.000001;
do {
    xi = xi_1;
    xi_1 = xi_2;
    xi_2 = xi - (fn(xi) * (xi - xi_1)) / (fn(xi) - fn(xi_1));
    iteration++;
    console.log({ x: xi_2, iteration });
} while (!(Math.abs((xi_2 - xi_1) / xi_2) * 100 < epsilon));

console.log({ x: xi_2, iteration });    