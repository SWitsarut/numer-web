import { compile } from "mathjs";

export default function Secant(question, x1, x2) {


    const fn = compile(question);
    let xi;
    let xi_1 = x1;
    let xi_2 = x2;
    let iteration = 0;
    const epsilon = 0.000001;
    const iterationData = [];
    do {
        xi = xi_1;
        xi_1 = xi_2;
        xi_2 = xi - (fn.evaluate({ x: xi }) * (xi - xi_1)) / (fn.evaluate({ x: xi }) - fn.evaluate({ x: xi_1 }));
        iteration++;
        const iterData = { iteration, xi, xi_1, xi_2 }
        iterationData.push(iterData);
    } while (!(Math.abs((xi_2 - xi_1) / xi_2) * 100 < epsilon));

    // console.log({ x: xi_2, iteration });
    return { data: xi_2, iterationData };
}