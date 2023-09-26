import React, { useState, useRef } from "react";
import axios from "axios";
import { Button, Stack, TextField } from "@mui/material";
type iterationData = {
	iteration?: number;
	x: number;
	y: number;
};

type GraphicalRes = {
	data: number;
	iterationData: iterationData[];
};

function Graphical() {
	const [answerState, setAnwerState] = useState<GraphicalRes>();
	const [isLoading, setLoading] = useState<boolean>();

	const xl = useRef<HTMLInputElement>();
	const xr = useRef<HTMLInputElement>();
	const question = useRef<HTMLInputElement>();

	const fetchAnswer = async () => {
		setLoading(true);
		try {
			const data = await axios.post<GraphicalRes>(`http://localhost:8080/graphical`, {
				question: question.current,
				xl: xl.current?.value,
				xr: xr.current?.value,
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
			<h2>Graphical</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					fetchAnswer();
				}}
			>
				<Stack spacing={2}>
					<TextField inputRef={question} variant="outlined" label="Question" required />
					<TextField
						type="number"
						inputRef={xl}
						variant="outlined"
						label="start"
						required
					/>
					<TextField
						type="number"
						inputRef={xr}
						variant="outlined"
						label="end"
						required
					/>
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
			</Stack>
		</Stack>
	);
}

export default Graphical;
