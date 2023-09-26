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
	const [answerState, setAnwerState] = useState<OnePointRes>();
	const [isLoading, setLoading] = useState<boolean>();

	const x0 = useRef<HTMLInputElement>();
	const question = useRef<HTMLInputElement>();

	const fetchAnswer = async () => {
		setLoading(true);
		try {
			const data = await axios.post<OnePointRes>(`http://localhost:8080/newton-raphson`, {
				question: question.current?.value,
				x0: x0.current?.value,
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
					<TextField inputRef={question} variant="outlined" label="Question" required />
					<TextField type="number" inputRef={x0} variant="outlined" label="x0" required />
					<Button type="submit" variant="contained">
						go
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
