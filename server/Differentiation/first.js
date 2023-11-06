import { compile } from "mathjs"

export function firstForward(question, x, h) {
    let fn;
    try {
        fn = compile(question);
    } catch (error) {
        console.error(error);
    }
    return (fn.evaluate({ x: x + h }) - fn.evaluate({ x })) / (h);

}

export function firstBackward(question, x, h) {
    let fn;
    try {
        fn = compile(question);
    } catch (error) {
        console.error(error);
    }
    return (fn.evaluate({ x: x }) - fn.evaluate({ x: x - h })) / (h);

}
export function firstCentral(question, x, h) {
    let fn;
    try {
        fn = compile(question);
    } catch (error) {
        console.error(error);
    }
    const left = fn.evaluate({ x: x + h })
    const right = fn.evaluate({ x: x - h })
    console.log(left + " " + right)
    return (left - right) / (2 * h);
}


// console.log(firstForward("e^x", 2, 0.25));
// console.log(firstBackward("e^x", 2, 0.25));
// console.log(firstCentral("e^x", 2, 0.25));