import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { compile } from "mathjs";
import { SecantRes } from "../../type and interface/type";
import Plot from "react-plotly.js";

export default function Secant() {
	document.title = "Secant";
	const [question, setQuestion] = useState<string>("");
	const [x0, setX0] = useState<number>(0);
	const [x1, setX1] = useState<number>(0);

	const [questionNum, setQuestionNum] = useState<number>(1);

	const [ans, setAns] = useState<SecantRes | null>(null);

	const [x, setX] = useState<number[] | undefined>([]);
	const [y, setY] = useState<number[] | undefined>([]);
	// const y: number[] = [];
	const fetchAnswer = async () => {
		await axios
			.post("http://localhost:8080/secant", {
				question: question,
				x0: Number(x0),
				x1: Number(x1),
			})
			.then((e) => {
				console.log(e);
				setAns(e?.data);
			});
	};
	const getGraph = async () => {
		const tempx: number[] = [];
		const tempy: number[] = [];

		const fn = compile(question);
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
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
						type="text"
						variant="outlined"
						label={"question"}
					/>
					<TextField
						value={x0}
						onChange={(e) => {
							const ne = Number(e.target.value);
							setX0(ne);
						}}
						type="number"
						variant="outlined"
						label={"x0"}
					/>
					<TextField
						value={x1}
						onChange={(e) => {
							const ne = Number(e.target.value);
							setX1(ne);
						}}
						type="number"
						variant="outlined"
						label={"x1"}
					/>
					<Button type="submit" variant="contained">
						Calculate
					</Button>
				</Stack>
			</form>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					axios.get(`http://localhost:8080/secant/${questionNum}`).then((e) => {
						// console.log(e?.data);
						const { data } = e;
						setQuestion(data.question || "");
						setX0(data.x0 || 1);
					});
				}}
			>
				<Stack direction={"row"} spacing={2}>
					<TextField
						variant="outlined"
						value={questionNum}
						type="number"
						fullWidth
						onChange={(e) => {
							const nq = Math.max(Number(e.target.value), 1);
							setQuestionNum(nq);
						}}
					/>
					<Button fullWidth type="submit" variant="contained">
						Get Question
					</Button>
				</Stack>
			</form>
			<h2>{ans?.data}</h2>
			<Plot
				data={[{ x: x, y: y, marker: { color: "red" }, showlegend: false }]}
				layout={{ height: 500 }}
			/>
		</Stack>
	);
}
