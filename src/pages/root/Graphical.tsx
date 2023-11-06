import { useState, useRef } from "react";
import axios from "axios";
import { Button, Stack, TextField } from "@mui/material";
import Plot from "react-plotly.js";
import { compile } from "mathjs";
import { GraphicalRes } from "../../type and interface/type";
import { BlockMath } from "react-katex";

function Graphical() {
	document.title = "Graphical";
	const [answerState, setAnwerState] = useState<GraphicalRes>();
	const [isLoading, setLoading] = useState<boolean>();

	const [question, setQuestion] = useState<string>("");
	const [xl, setXl] = useState<number>(0);
	const [xr, setXr] = useState<number>(0);

	const [x, setX] = useState<number[]>();
	const [y, setY] = useState<number[]>();

	const [questionNum, setQuestionNum] = useState<number>(1);
	let GraphX: number[] = [];
	let GraphY: number[] = [];
	const fetchAnswer = async () => {
		setLoading(true);
		try {
			const response = await axios.post<GraphicalRes>(`http://localhost:8080/graphical`, {
				question: question,
				xl: Number(xl),
				xr: Number(xr),
			});

			// Log the response to check its structure
			console.log("Response from server:", response);

			// Extract data from the response
			const data = response.data;

			// Log the extracted data
			console.log("Extracted data:", data);

			setAnwerState(data);
			setLoading(false);
		} catch (err) {
			console.error("Error fetching data:", err);
			setLoading(false);
		}
	};

	return (
		<Stack spacing={2}>
			<h2>Graphical</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					fetchAnswer();
					const fn = compile(question || "");
					const valXl = Number(xl);
					const valXr = Number(xr);
					GraphX = [];
					GraphY = [];
					for (let i = valXl; i <= valXr; i += 0.1) {
						GraphX.push(i);
						GraphY.push(fn.evaluate({ x: i }));
					}
					setX(GraphX);
					setY(GraphY);
					console.log(GraphX);
					console.log(GraphY);
				}}
			>
				<Stack spacing={2}>
					<TextField
						label="Question"
						value={question}
						onChange={(e) => {
							setQuestion(e.target.value);
						}}
						variant="outlined"
						required
					/>
					<TextField
						type="number"
						label="start"
						value={xl}
						onChange={(e) => {
							const nx = Number(e.target.value);
							setXl(nx);
						}}
						variant="outlined"
						required
					/>
					<TextField
						type="number"
						label="end"
						value={xr}
						onChange={(e) => {
							const nx = Number(e.target.value);
							setXr(nx);
						}}
						variant="outlined"
						required
					/>
					<Button type="submit" variant="contained">
						go
					</Button>
				</Stack>
			</form>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					axios.get(`http://localhost:8080/graphical/${questionNum}`).then((e) => {
						// console.log(e?.data);
						const { data } = e;
						const resXl = Number(data.xl);
						const resXr = Number(data.xr);
						setQuestion(data.question);
						setXl(resXl);
						setXr(resXr);
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
							const nq = Number(e.target.value);
							setQuestionNum(nq);
						}}
					/>
					<Button fullWidth type="submit" variant="contained">
						Get Question
					</Button>
				</Stack>
			</form>
			<Stack alignItems={"center"}>
				{isLoading ? (
					<h2>Loading...</h2>
				) : answerState?.data ? (
					<BlockMath math={`x = ${answerState?.data}`} />
				) : null}
				<Plot
					data={[
						{
							name: "graph",
							x,
							y,
							marker: { color: "red" },
							showlegend: false,
						},
						{
							name: "answer",
							mode: "markers",
							x: [Number(answerState?.data)], // Display a marker at the root
							y: [0], // At y = 0
							marker: {
								symbol: "x", // Use 'x' symbol for the marker
								size: 10,
								color: "green",
							}, // Customize the color of the marker
						},
					]}
					layout={{ height: 500 }}
				/>
			</Stack>
		</Stack>
	);
}

export default Graphical;
