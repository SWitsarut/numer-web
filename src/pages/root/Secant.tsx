import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { compile } from "mathjs";
import { SecantRes } from "../../type and interface/type";
import Plot from "react-plotly.js";

export default function Secant() {
	document.title = "Secant";
	const question = useRef<HTMLInputElement | undefined>(null);
	const x0 = useRef<HTMLInputElement | undefined>(null);
	const x1 = useRef<HTMLInputElement | undefined>(null);

	const [ans, setAns] = useState<SecantRes | null>(null);

	const [x, setX] = useState<number[] | undefined>([]);
	const [y, setY] = useState<number[] | undefined>([]);
	// const y: number[] = [];
	const fetchAnswer = async () => {
		await axios
			.post("http://localhost:8080/secant", {
				question: question.current?.value,
				x0: x0.current?.value,
				x1: x1.current?.value,
			})
			.then((e) => {
				console.log(e);
				setAns(e?.data);
			});
	};
	const getGraph = async () => {
		const strQuestion: string = question.current?.value || "";
		const tempx: number[] = [];
		const tempy: number[] = [];

		const fn = compile(strQuestion);
		for (let index = -10; index <= 10; index++) {
			const fx = fn.evaluate({ x: index });
			tempx.push(index);
			tempy.push(fx);
		}
		setX(() => {
			return tempx;
		});
		setY(() => {
			return tempy;
		});
		console.log(x);
		console.log(y);
	};
	return (
		<Stack spacing={2}>
			<h2>Secant</h2>
			<form
				onSubmit={async (e) => {
					e.preventDefault();

					await Promise.all([getGraph(), fetchAnswer()]);
				}}
			>
				<Stack spacing={2} alignContent={"center"}>
					<TextField
						inputRef={question}
						type="text"
						variant="outlined"
						label={"question"}
					/>
					<TextField inputRef={x0} type="number" variant="outlined" label={"x0"} />
					<TextField inputRef={x1} type="number" variant="outlined" label={"x1"} />
					<Button type="submit" variant="contained">
						Calculate
					</Button>
					<h2>{ans?.data}</h2>
					<Plot
						data={[{ x: x, y: y, marker: { color: "red" }, showlegend: false }]}
						layout={{ height: 500 }}
					/>
				</Stack>
			</form>
		</Stack>
	);
}
