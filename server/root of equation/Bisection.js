import { compile } from "mathjs";



export default function Bisection(question, XL, XR) {
    try {
        let xl = XL;
        let xr = XR;
        const fn = compile(question);
        let xm = (xl + xr) / 2;
        let xmOld = 100000;
        const epsilon = 0.000001;
        let iteration = 0;
        let error;
        let iData = [];
        do {
            iteration++;
            const fxl = fn.evaluate({ x: xl });
            const fxr = fn.evaluate({ x: xr });
            const fxm = fn.evaluate({ x: xm });
            if (fxm * fxr < 0) {
                xl = xm;
            } else {
                xr = xm;
            }
            xmOld = xm;
            xm = (xl + xr) / 2;
            error = Math.abs((xm - xmOld) / xm) * 100;
            iData.push({
                iteration, xl, fxl, xm: xmOld, fxm, xr, fxr, error
            })
        } while (!(error < epsilon));

        return { data: xm, iterationData: iData }
    } catch (error) {
        return error;
    }
}

