import { compile } from "mathjs"

export function secondForward(question, x, h) {
    let fn;
    try {
        fn = compile(question);
    } catch (error) {
        console.error(error);
    }
    return (-1 * (fn.evaluate({ x: x + 3 * h })) + (4 * fn.evaluate({ x: x + 2 * h })) - (5 * fn.evaluate({ x: x + h })) + (2 * fn.evaluate({ x: x }))) / Math.pow(h, 2);

}

export function secondBackward(question, x, h) {
    let fn;
    try {
        fn = compile(question);
    } catch (error) {
        console.error(error);
    }
    return (-1 * (fn.evaluate({ x: x - 3 * h })) + (4 * fn.evaluate({ x: x - 2 * h })) - (5 * fn.evaluate({ x: x - h })) + (2 * fn.evaluate({ x: x }))) / Math.pow(h, 2);

}

export function secondCentral(question, x, h) {
    let fn;
    try {
        fn = compile(question);
    } catch (error) {
        console.error(error);
    }
    return (-1 * fn.evaluate({ x: x + 2 * h }) + 16 * fn.evaluate({ x: x + h }) - 30 * fn.evaluate({ x }) + 16 * fn.evaluate({ x: x - h }) - 1 * fn.evaluate({ x: x - 2 * h })) / (12 * Math.pow(h, 2));

}

// console.log(secondBackward("e^(x/3) + x^2", -2.5, 0.1))
// console.log(secondForward("e^(x/3) + x^2", -2.5, 0.1))
// console.log(secondCentral("e^(x/3) + x^2", -2.5, 0.1))