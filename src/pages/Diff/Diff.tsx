import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BlockMath } from "react-katex";
import { compile, derivative as diff } from "mathjs";

enum derivativeEnum {
	first = "first",
	second = "second",
}
enum methodEnum {
	forward = "forward",
	central = "central",
	backward = "backward",
}
interface diffRes {
	answer: number;
	derivative: number;
}
function Diff() {
	const [derivative, setDerivative] = useState<derivativeEnum>(derivativeEnum.first); // Initialize with a default value
	const [method, setMethod] = useState<methodEnum>(methodEnum.forward);

	const [question, setQuestion] = useState<string>("");
	const [x, setX] = useState<number>(0);
	const [h, setH] = useState<number>(0);

	const [ans, setAns] = useState<diffRes | undefined>(undefined);

	const [id, setId] = useState<number>(1);

	useEffect(() => {
		document.title = "Derivative";
	}, []);

	const [realDiff, setrealDiff] = useState<number | undefined>(undefined);

	function getRealDiff(question: string, point: number): number {
		let q = question;
		let order: number;
		if (derivative == derivativeEnum.first) {
			order = 1;
		} else {
			order = 2;
		}
		for (let i = 0; i < order + 1; i++) {
			q = diff(q, "x").toString();
		}
		const fn = compile(q);
		const answer = fn.evaluate({ x: point });
		return answer;
	}

	function getQuestion() {
		axios.get(`http://localhost:8080/diff/${id}`).then((e) => {
			const [data] = e.data;
			console.log(data);
			setQuestion(data.question);
			setX(data.x);
			setH(data.h);
		});
	}

	function cal() {
		axios
			.post(`http://localhost:8080/diff/${derivative}`, { method, question, x, h })
			.then((e) => {
				setAns(e.data);
				console.log(e.data);
			});
	}

	return (
		<Stack spacing={2}>
			<h2>Diff</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					cal();
					setrealDiff(getRealDiff(question, x));
					console.log({ derivative, method, question, x, h });
				}}
			>
				<Stack spacing={2}>
					<Stack spacing={2} direction={"row"}>
						<FormControl fullWidth>
							<InputLabel id="derivative">Derivative</InputLabel>
							<Select
								labelId="derivative"
								label="Derivative"
								defaultValue={derivativeEnum.first as derivativeEnum}
								value={derivative}
								onChange={(e) => {
									return setDerivative(e.target.value as derivativeEnum);
								}}
							>
								<MenuItem value={derivativeEnum.first as derivativeEnum}>
									1st
								</MenuItem>
								<MenuItem value={derivativeEnum.second as derivativeEnum}>
									2nd
								</MenuItem>
							</Select>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel id="method">Method</InputLabel>
							<Select
								labelId="method"
								label="Method"
								defaultValue={methodEnum.forward as methodEnum}
								value={method}
								onChange={(e) => {
									setMethod(e.target.value as methodEnum);
								}}
							>
								<MenuItem value={methodEnum.forward as methodEnum}>
									Forward
								</MenuItem>
								<MenuItem value={methodEnum.central as methodEnum}>
									Central
								</MenuItem>
								<MenuItem value={methodEnum.backward as methodEnum}>
									Backward
								</MenuItem>
							</Select>
						</FormControl>
					</Stack>
					<TextField
						label={"question"}
						type="text"
						fullWidth
						value={question}
						required
						onChange={(e) => {
							setQuestion(e.target.value);
						}}
					/>
					<Stack direction={"row"} spacing={2}>
						<TextField
							fullWidth
							label="x"
							type="nmber"
							value={x}
							required
							onChange={(e) => {
								const numX = Number(e.target.value);
								setX(numX);
							}}
							inputProps={{ step: "any" }}
						/>
						<TextField
							fullWidth
							label="h"
							type="number"
							value={h}
							onChange={(e) => {
								const numH = Number(e.target.value);
								setH(numH);
							}}
							inputProps={{ step: "any" }}
						/>
					</Stack>
					<Button variant="contained" type="submit">
						submit
					</Button>
				</Stack>
			</form>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					getQuestion();
				}}
			>
				<Stack spacing={2} direction={"row"}>
					<TextField
						fullWidth
						label="เลขข้อ"
						value={id}
						type="number"
						onChange={(e) => {
							const numQN = Math.max(Number(e.target.value), 1);
							setId(numQN);
						}}
					/>
					<Button type="submit" variant="contained" fullWidth>
						GET QUESTION
					</Button>
				</Stack>
			</form>
			{ans !== undefined && ans !== null ? (
				<Stack spacing={2}>
					<BlockMath
						math={`real ; f^{${"\\prime".repeat(ans.derivative)}}(x) = ${realDiff}`}
					/>
					<BlockMath
						math={`f^{${"\\prime".repeat(ans.derivative)}}(x) = ${ans?.answer}`}
					/>
				</Stack>
			) : null}
		</Stack>
	);
}

export default Diff;
