import { compile } from "mathjs"


export default function OnePoint(question, x0) {

	const fn = compile(question);
	// 7+x = x^^2+x
	let xi;
	let xi_1 = x0;
	let iteration = 0;
	const epsilon = 0.000001;
	const iterationData = [];
	do {
		iteration++;
		xi = xi_1;
		xi_1 = fn.evaluate({ x: xi });
		// consol1e.log({ x: xi_1, iteration });
		iterationData.push({ iteration, xi, xi_1 })
	} while (!(Math.abs((xi_1 - xi) / xi_1) * 100 < epsilon));

	console.log({ x: xi_1, iteration });
	return { data: xi_1, iterationData }
}