import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BlockMath } from "react-katex";

type mul_least_squareAns = {
	answer: number;
	targetX: number;
};
function Mul_regression() {
	const [xNum, setXNum] = useState<number>(3);
	const [size, setSize] = useState<number>(5);
	const [x, setX] = useState<number[][]>(new Array(3).fill(new Array(5).fill(0)));
	const [y, setY] = useState<number[]>(new Array(5).fill(0));
	const [targetX, setTargetX] = useState<number[]>(new Array(xNum).fill(0));

	useEffect(() => {
		document.title = "Least Square Regression";
	}, []);

	const [questionNum, setQuestionNum] = useState<number>(1);

	const [ans, setAns] = useState<mul_least_squareAns>();

	return (
		<Stack spacing={2}>
			<h2>Least square regression</h2>
			<TextField
				label={"จะเอา x กีตัว"}
				value={xNum}
				type="number"
				onChange={(e) => {
					const newXnum = Math.min(Math.max(Number(e.target.value), 1), 5);
					setXNum(newXnum);
					const newXnumX = new Array(newXnum).fill(new Array(size).fill(0));
					for (let i = 0; i < x?.length && i < newXnum; i++) {
						newXnumX[i] = x[i];
					}
					setX(newXnumX);
				}}
			/>
			<TextField
				label={"size"}
				value={size}
				type="number"
				onChange={(e) => {
					const newSize = Math.min(Math.max(Number(e.target.value), 1), 15);
					setSize(newSize);

					const newSizeX = new Array(xNum).fill([]).map(() => new Array(newSize).fill(0));
					for (let i = 0; i < x?.length && i < newSizeX.length; i++) {
						for (let j = 0; j < x[i]?.length && j < newSizeX[i].length; j++) {
							newSizeX[i][j] = x[i][j];
						}
					}
					setX(newSizeX);

					const newSizeY = new Array(newSize).fill(0);
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
						.post("http://localhost:8080/mul-regression", {
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
							<Stack spacing={2} direction={"row"}>
								{x.map((value, i) => {
									return (
										<Stack key={i} spacing={2}>
											{value.map((element, j) => {
												return (
													<TextField
														key={`x${i + 1}${j}`}
														label={`x${i + 1}${j}`}
														value={element}
														onChange={(e) => {
															const newX = [...x];
															newX[i][j] = Number(e.target.value);
															setX(newX);
														}}
													/>
												);
											})}
										</Stack>
									);
								})}
							</Stack>
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
					</Stack>
					<h2>target x</h2>
					<Stack direction={"row"} spacing={2}>
						{targetX?.map((value, index) => {
							return (
								<TextField
									key={index}
									value={value}
									type="number"
									label={`target x${index}`}
									onChange={(e) => {
										const newTargetX = [...targetX];
										newTargetX[index] = Number(e.target.value);
										setTargetX(newTargetX);
									}}
								/>
							);
						})}
					</Stack>

					<Button fullWidth variant="contained" type="submit">
						Go
					</Button>
				</Stack>
			</form>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					axios.get(`http://localhost:8080/mul-regression/${questionNum}`).then((e) => {
						console.log(e.data);
						const [data] = e.data;
						const jsonX: number[][] = JSON.parse(data.x);
						const jsonY: number[] = JSON.parse(data.y);
						const jsonTargetX: number[] = JSON.parse(data.targetX);
						setXNum(jsonX.length);
						setSize(jsonX[0].length);
						setX(jsonX);
						setY(jsonY);
						setTargetX(jsonTargetX);
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

export default Mul_regression;
