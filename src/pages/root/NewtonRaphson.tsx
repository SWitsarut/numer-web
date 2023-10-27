import { useState, useRef } from "react";
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

type iterationData = {
	iteration: number;
	xi: number;
	xi_1: number;
};

type OnePointRes = {
	data: number;
	iterationData: iterationData[];
};

function NewtomRaphson() {
	document.title = "newton-raphson";
	const [answerState, setAnwerState] = useState<OnePointRes>();
	const [isLoading, setLoading] = useState<boolean>();

	const [x0, setX0] = useState<number>(0);
	const [question, setQuestion] = useState<string>("");

	const [questionNum, setQuestionNum] = useState<number>(1);

	const fetchAnswer = async () => {
		setLoading(true);
		try {
			const data = await axios.post<OnePointRes>(`http://localhost:8080/newton-raphson`, {
				question,
				x0: Number(x0),
			});
			console.log(data);
			setAnwerState(data.data);
			setLoading(false);
		} catch (err) {
			return err;
		}
	};
	return (
		<Stack spacing={2}>
			<h2>Newtom Raphson</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					// console.log(question.current);
					fetchAnswer();
				}}
			>
				<Stack spacing={2}>
					<TextField
						value={question}
						onChange={(e) => {
							setQuestion(e.target.value);
						}}
						variant="outlined"
						label="Question"
						required
					/>
					<TextField
						type="number"
						value={x0}
						onChange={(e) => {
							const ne = Number(e.target.value);
							setX0(ne);
						}}
						variant="outlined"
						label="x0"
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
					axios.get(`http://localhost:8080/newton-raphson/${questionNum}`).then((e) => {
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
			<Stack alignItems={"center"}>
				{isLoading ? (
					<h2>Loading...</h2>
				) : answerState?.data ? (
					<h2>answer is {answerState?.data}</h2>
				) : null}
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

export default NewtomRaphson;
