import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BlockMath } from "react-katex";

type least_squareAns = {
	answer: number;
	targetX: number;
};
function Least_Square() {
	const [size, setSize] = useState<number>(5);
	const [x, setX] = useState<number[]>(new Array(5).fill(0));
	const [y, setY] = useState<number[]>(new Array(5).fill(0));
	const [m, setM] = useState<number>(1);
	const [targetX, setTargetX] = useState<number>(0);

	useEffect(() => {
		document.title = "Least Square Regression";
	}, []);

	const [questionNum, setQuestionNum] = useState<number>(1);

	const [ans, setAns] = useState<least_squareAns>();

	return (
		<Stack spacing={2}>
			<h2>Least square regression</h2>
			<TextField
				label={"size"}
				value={size}
				type="number"
				onChange={(e) => {
					const newSize = Math.min(Math.max(Number(e.target.value), 1), 15);
					setSize(newSize);
					const newSizeX = new Array(newSize).fill(0);
					for (let i = 0; i < x?.length && i < newSize; i++) {
						newSizeX[i] = x[i];
					}
					setX(newSizeX);

					const newSizeY: number[] = new Array(newSize).fill(0);
					for (let i = 0; i < y?.length && i < newSize; i++) {
						newSizeY[i] = y[i];
					}
					setY(newSizeY);
				}}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					axios
						.post("http://localhost:8080/regression", {
							m,
							x,
							y,
							targetX,
						})
						.then((e) => {
							const { data } = e;
							console.log(data);
							setAns(data);
						});
				}}
			>
				<Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
					<Stack spacing={2} direction={"row"}>
						<Box
							display="flex"
							justifyContent={"center"}
							alignItems={"center"}
							flexDirection={"column"}
							gap={2}
						>
							<h3>X</h3>
							{x?.map((value, index) => {
								return (
									<TextField
										sx={{ maxWidth: "300px" }}
										type="number"
										key={index}
										value={value}
										onChange={(e) => {
											const newXi = Number(e.target.value);
											setX((prev) => {
												const updatedX: number[] = [...prev];
												updatedX[index] = newXi;
												return updatedX;
											});
										}}
										label={`x${index}`}
									/>
								);
							})}
						</Box>
						<Box
							display="flex"
							justifyContent={"center"}
							alignItems={"center"}
							flexDirection={"column"}
							gap={2}
						>
							<h3>Y</h3>
							{y?.map((value, index) => {
								return (
									<TextField
										sx={{ maxWidth: "300px" }}
										type="number"
										key={index}
										value={value}
										onChange={(e) => {
											const newYi = Number(e.target.value);
											setY((prev) => {
												const updatedY: number[] = [...prev];
												updatedY[index] = newYi;
												return updatedY;
											});
										}}
										label={`x${index}`}
									/>
								);
							})}
						</Box>

						{/* <TextField labe/> */}
					</Stack>
					<TextField
						label="x เป้าหมาย"
						fullWidth
						type="number"
						value={targetX}
						onChange={(e) => {
							const newM = Math.max(Number(e.target.value), 1);
							setTargetX(newM);
						}}
					/>
					<TextField
						label="m"
						fullWidth
						type="number"
						value={m}
						onChange={(e) => {
							const newM = Math.max(Number(e.target.value), 1);
							setM(newM);
						}}
					/>
					<Button fullWidth variant="contained" type="submit">
						Go
					</Button>
				</Stack>
			</form>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					axios.get(`http://localhost:8080/regression/${questionNum}`).then((e) => {
						console.log(e.data);
						const [data] = e.data;
						const jsonX: number[] = JSON.parse(data.x);
						const jsonY: number[] = JSON.parse(data.y);
						setSize(jsonX.length);
						setX(jsonX);
						setY(jsonY);
						setM(data.m);
						setTargetX(data.targetX);
					});
				}}
			>
				<Stack direction={"row"} spacing={2}>
					<TextField
						fullWidth
						label="เลขข้อ"
						type="number"
						value={questionNum}
						onChange={(e) => {
							const numQN = Math.max(Number(e.target.value), 1);
							setQuestionNum(numQN);
						}}
					/>
					<Button fullWidth variant="contained" type="submit">
						GET QUESTION
					</Button>
				</Stack>
			</form>
			{ans?.answer !== null && ans?.answer !== undefined ? (
				<BlockMath math={`f(${ans?.targetX}) = ${ans?.answer}`} />
			) : null}
		</Stack>
	);
}

export default Least_Square;
