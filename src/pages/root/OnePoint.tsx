import React, { useState, useRef } from "react";
import axios from "axios";
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
import Plot from "react-plotly.js";
import { compile } from "mathjs";

type iterationData = {
	iteration: number;
	xi: number;
	xi_1: number;
};

type OnePointRes = {
	data: number;
	iterationData: iterationData[];
};

function OnePoint() {
	document.title = "one point iteration";
	const [answerState, setAnwerState] = useState<OnePointRes>();
	const [isLoading, setLoading] = useState<boolean>();
	const [minXi_1, setMinXi_1] = useState<number>();
	const [maxXi_1, setMaxXi_1] = useState<number>();

	const x0 = useRef<HTMLInputElement>();
	const question = useRef<HTMLInputElement>();

	const x: number[] = [];
	const y: number[] = [];

	const [xState, setXstate] = useState<number[]>();
	const [yState, setYstate] = useState<number[]>();

	const fetchAnswer = async () => {
		setLoading(true);
		try {
			const data = await axios.post<OnePointRes>(`http://localhost:8080/onepoint`, {
				question: question.current?.value,
				x0: x0.current?.value,
			});
			console.log(data.data);
			setAnwerState(data.data);
			setLoading(false);
		} catch (err) {
			return err;
		}
	};

	async function getMaxXi_1() {
		let maxXi = Number.MIN_VALUE;

		for (const item of answerState?.iterationData || []) {
			if (item.xi_1 > maxXi) {
				maxXi = item.xi;
			}
		}
		console.log("maxXi", maxXi);
		setMaxXi_1(maxXi);
	}

	async function getMinXi_1() {
		let minXi = Number.MAX_VALUE;

		for (const item of answerState?.iterationData || []) {
			if (item.xi < minXi) {
				minXi = item.xi;
			}
		}
		console.log("minXi", minXi);
		setMinXi_1(minXi);
	}

	async function plotGraph() {
		console.log(maxXi_1);
		console.log(minXi_1);
		const strQuestion: string = question.current?.value || "";
		const fn = compile(strQuestion);
		const max = maxXi_1 || 0;
		x.length = 0;
		y.length = 0;
		for (let i = minXi_1 || 0; i < max; i += 0.1) {
			x.push(i);
			y.push(fn.evaluate({ x: i }));
		}
		setXstate(x);
		setYstate(y);
	}

	return (
		<Stack spacing={2}>
			<h2>One Point Iteration</h2>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					// console.log(question.current);
					await fetchAnswer();
					getMaxXi_1();
					getMinXi_1();
					await plotGraph();
				}}
			>
				<Stack spacing={2}>
					<TextField
						type="text"
						inputRef={question}
						variant="outlined"
						label="Question"
						required
					/>
					<TextField type="number" inputRef={x0} variant="outlined" label="x0" required />
					<Button type="submit" variant="contained">
						go
					</Button>
				</Stack>
			</form>
			<Stack alignItems={"center"} spacing={2}>
				{isLoading ? (
					<h2>Loading...</h2>
				) : answerState?.data ? (
					<h2>answer is {answerState?.data}</h2>
				) : null}
				<Plot
					data={[
						{
							x: [minXi_1 ? minXi_1 : 0, answerState?.data ? maxXi_1 || 0 : 0],
							y: [minXi_1 ? minXi_1 : 0, answerState?.data ? maxXi_1 || 0 : 0],
							marker: { color: "blue" },
							showlegend: false,
						},
						{
							x: xState,
							y: yState,
							marker: { color: "red" },
							showlegend: false,
						},
						{
							name: "answer",
							mode: "markers",
							x: [Number(answerState?.data)],
							y: [Number(answerState?.data)],
							marker: {
								symbol: "x",
								size: 10,
								color: "green",
							},
							showlegend: false,
						},
					]}
					layout={{ height: 500 }}
				/>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Iteration</TableCell>
								<TableCell align="center">xi</TableCell>
								<TableCell align="center">xi+1</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{answerState?.iterationData?.map(
								(data: iterationData, index: number) => (
									<TableRow
										key={index}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
										}}
									>
										<TableCell component="th" scope="row">
											{data.iteration}
										</TableCell>
										<TableCell align="center">{data.xi}</TableCell>
										<TableCell align="center">{data.xi_1}</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Stack>
		</Stack>
	);
}

export default OnePoint;
