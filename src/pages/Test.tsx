import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BlockMath } from "react-katex";

function Test() {
	const [question, setQuestion] = useState<string>("");
	const [x, setX] = useState<number>(0);
	const [h, setH] = useState<number>(0);

	const [questionNum, setQuestionNum] = useState<number>(1);

	const [ans, setAns] = useState<number>();
	return (
		<Stack spacing={2}>
			<h2>Diff test</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					axios.post("http://localhost:8080/test1/", { question, x, h }).then((e) => {
						setAns(e.data);
						console.log(e.data);
					});
				}}
			>
				<Stack spacing={2}>
					<TextField
						value={question}
						label={"question"}
						onChange={(e) => {
							setQuestion(e.target.value);
						}}
					/>
					<Stack spacing={2} direction={"row"}>
						<TextField
							fullWidth
							type="number"
							value={x}
							label={"x"}
							onChange={(e) => {
								const numX = Number(e.target.value);
								setX(numX);
							}}
						/>
						<TextField
							fullWidth
							type="number"
							value={h}
							label="h"
							onChange={(e) => {
								const numH = Number(e.target.value);
								setH(numH);
							}}
						/>
					</Stack>
					<Button type="submit" variant="contained">
						Go
					</Button>
				</Stack>
			</form>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					axios.get(`http://localhost:8080/test1/${questionNum}`).then((e) => {
						console.log(questionNum);
						const [data] = e.data;
						setQuestion(data.question);
						setX(data.x);
						setH(data.h);
					});
				}}
			>
				<Stack spacing={2} direction={"row"}>
					<TextField
						type="number"
						value={questionNum}
						fullWidth
						onChange={(e) => {
							const numQn = Math.max(Number(e.target.value), 1);
							setQuestionNum(numQn);
						}}
					/>
					<Button fullWidth type="submit" variant="contained">
						GET QUESTION
					</Button>
				</Stack>
			</form>
			{ans !== undefined && ans !== null ? <BlockMath math={`f''(x) = ${ans}`} /> : null}
		</Stack>
	);
}

export default Test;
