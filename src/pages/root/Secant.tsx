import {
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { compile } from "mathjs";
import { SecantRes } from "../../type and interface/type";
import Plot from "react-plotly.js";
import { BlockMath } from "react-katex";

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
				console.log(e.data);
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
		setX(() => {www
			return tempx;
		});
		setY(() => {
			return tempy;
		});
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
						console.log(e?.data);
						const { data } = e;
						setQuestion(data.question);
						setX0(data.x0);
						setX1(data.x1);
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
			{ans !== undefined && ans !== null ? (
				<BlockMath math={`answer = ${ans?.data}`} />
			) : null}

			<Plot
				data={[{ x: x, y: y, marker: { color: "red" }, showlegend: false }]}
				layout={{ height: 500 }}
			/>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Iteration</TableCell>
							<TableCell align="center">xi</TableCell>
							<TableCell align="center">xi+1</TableCell>
							<TableCell align="center">xi+2</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ans?.iterationData?.map((value, index) => (
							<TableRow
								key={index}
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
								}}
							>
								<TableCell component="th" scope="row">
									{value?.iteration}
								</TableCell>
								<TableCell align="center">{value.xi}</TableCell>
								<TableCell align="center">{value.xi_1}</TableCell>
								<TableCell align="center">{value.xi_2}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
}
