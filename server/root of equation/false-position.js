import { compile } from "mathjs";


function falsePosition(question, XL, XR) {
    let xl = XL
    let xr = XR;
    let fn = compile(question);
    let oldXm = 100000000;
    const eps = 0.000001;
    let iteration = 0;
    let error = 0;
    let iData = [];
    let xm = (xl * fn.evaluate({ x: xr }) - xr * fn.evaluate({ x: xl })) / (fn.evaluate({ x: xr }) - fn.evaluate({ x: xl }));
    do {
        iteration++;
        const fxr = fn.evaluate({ x: xr });
        const fxl = fn.evaluate({ x: xl });
        const fxm = fn.evaluate({ x: xm })
        if (fxm * fxr < 0) {
            xl = xm;
        } else {
            xr = xm;
        }
        oldXm = xm;
        xm = (xl * fn.evaluate({ x: xr }) - xr * fn.evaluate({ x: xl })) / (fn.evaluate({ x: xr }) - fn.evaluate({ x: xl }));
        error = Math.abs((xm - oldXm) / xm) * 100
        iData.push({
            iteration, xl, fxl, xm: oldXm, fxm, xr, fxr, error
        })
    } while (!(error < eps));
    return { data: xm, iterationData: iData }
}

export default falsePosition;