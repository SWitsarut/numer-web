import { Box, TextField, Stack, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BlockMath } from "react-katex";

type props = {
	path: string;
};
function Matrix({ path }: props) {
	const [size, setSize] = useState<number>(3);
	const [A, setA] = useState<number[][]>(new Array(size).fill(new Array(size).fill(0)));
	const [B, setB] = useState<number[]>(() => new Array(size).fill(0));
	const [ans, setAns] = useState<number[]>();

	const [questionNum, setQuestionNum] = useState<number>(1);

	useEffect(() => {
		document.title = path.charAt(0).toUpperCase() + path.slice(1);
	}, [path]);

	const fetchAnswer = () => {
		axios
			.post("http://localhost:8080/" + path, {
				A,
				B,
			})
			.then((response) => {
				const responseData = response.data;
				setAns(responseData); // Update the ans state with the response data
			})
			.catch((error) => {
				console.error("Error fetching answer:", error);
			});
	};

	const handleMatrixChange = (rowIndex: number, colIndex: number, newValue: number) => {
		setA((prevA) => {
			const newA = prevA.map((row, i) => {
				if (i === rowIndex) {
					return row.map((value, j) => (j === colIndex ? newValue : value));
				}
				return row;
			});
			return newA;
		});
	};

	const handleBChange = (colIndex: number, newValue: number) => {
		setB((prevB) => {
			const newB = prevB.map((value, i) => (i === colIndex ? newValue : value));
			return newB;
		});
	};

	return (
		<Stack spacing={2}>
			<h2>{path.charAt(0).toUpperCase() + path.slice(1)}</h2>
			<TextField
				variant="outlined"
				label="Size m*m"
				type="number"
				value={size}
				onChange={(e) => {
					const size = Math.max(Math.min(Number(e.target.value), 15), 0);
					setSize(size);
					setA(() => new Array(size).fill(new Array(size).fill(0)));
					setB(() => new Array(size).fill(0));
				}}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					// console.log("Matrix A:", A);
					// console.log("Vector B:", B);
					fetchAnswer();
				}}
			>
				<Stack>
					<Box padding={"2em"} display={"flex"} justifyContent={"space-between"}>
						<Box className="A">
							<h3>A</h3>
							<Box display={"flex"} flexDirection={"column"} gap={2}>
								{A.map((row, rowIndex) => {
									return (
										<Box
											key={rowIndex}
											width="100%"
											display="flex"
											justifyContent="space-around"
											gap={2}
										>
											{row.map((_col, colIndex) => {
												return (
													<TextField
														type="number"
														sx={{ maxWidth: 120 }}
														key={`${rowIndex},${colIndex}`}
														value={A[rowIndex][colIndex]}
														label={`a${rowIndex}${colIndex}`}
														onChange={(e) => {
															const newValue = Number(e.target.value);
															handleMatrixChange(
																rowIndex,
																colIndex,
																newValue
															);
														}}
													/>
												);
											})}
										</Box>
									);
								})}
							</Box>
						</Box>
						<Box>
							<h3>X</h3>
							<Box
								display={"flex"}
								gap={2}
								padding={"0 1em"}
								flexDirection={"column"}
							>
								{B.map((_value, colIndex) => {
									return (
										<TextField
											type="number"
											sx={{ maxWidth: 120 }}
											key={`${colIndex}`}
											label={`x${colIndex}`}
											disabled
										/>
									);
								})}
							</Box>
						</Box>
						<Box>
							<h3>B</h3>
							<Box display={"flex"} gap={2} flexDirection={"column"}>
								{B.map((value, colIndex) => {
									return (
										<TextField
											type="number"
											sx={{ maxWidth: 120 }}
											key={`${colIndex}`}
											value={value}
											label={`b${colIndex}`}
											onChange={(e) => {
												const newValue = Number(e.target.value);
												handleBChange(colIndex, newValue);
											}}
										/>
									);
								})}
							</Box>
						</Box>
					</Box>
					<Button variant="contained" type="submit">
						Submit
					</Button>
				</Stack>
			</form>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					axios
						.get(
							`http://localhost:8080/linearEquation/${
								path == "jacobi" || path == "gauss-seidel" ? "jacobi" : "cramer"
							}/${questionNum}`
						)
						.then((e) => {
							const { data } = e;
							const resA = JSON.parse(data.A);
							const resB = JSON.parse(data.B);
							setSize(resA.length);
							setA(resA);
							setB(resB);
						});
				}}
			>
				<Stack direction={"row"} spacing={2}>
					<TextField
						label="เลขข้อ"
						value={questionNum}
						onChange={(e) => {
							const qN = Number(e.target.value);
							setQuestionNum(qN);
						}}
						fullWidth
						type="number"
					/>
					<Button variant="contained" fullWidth type="submit">
						get question
					</Button>
				</Stack>
			</form>
			<Stack spacing={2}>
				<h3>Answer</h3>
				<Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
					{ans?.map((value, index) => (
						<BlockMath key={index} math={`x_{${index}} = ${value}`} />
					))}
				</Box>
			</Stack>
		</Stack>
	);
}

export default Matrix;
