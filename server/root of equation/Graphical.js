import { compile } from "mathjs";

export default function Graphical(question, xl, xr) {
	let fn;
	try {
		fn = compile(question);
	} catch (error) {
		return error;
	}
	let iterationData = [];
	const epsilon = 0.01;
	let start = xl;
	let max = xr;
	let iteration = 0;

	let startLength;
	for (let i = start; i <= max; i += 1) {
		console.log(i)
		iteration++;
		iterationData.push({ iteration, x: i })
		if (fn.evaluate({ x: i }) * fn.evaluate({ x: i + 1 }) < 0) {
			startLength = i;
			break;
		}
	}
	
	let sloved = false;
	let ans;
	for (let i = startLength; i <= startLength + 1; i += 0.00001) {
		iteration++;
		const y = fn.evaluate({ x: i })
		console.log(y)
		iterationData.push({ iteration, x: i, y })
		if (Math.abs(y) < epsilon) {
			sloved = true;
			ans = i;
			break;
		}
	}

	// sloved ? console.log(`x = ${x}`) : console.log(`unable to slove ${question}`);
	if (sloved) {
		return { data: ans, iterationData };
	} else {
		return { error: "unable to find answer" }
	}
}
