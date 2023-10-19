import { Box, TextField, Stack, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function Cramer() {
	const [size, setSize] = useState<number>(3);
	const [A, setA] = useState<number[][]>(new Array(size).fill(new Array(size).fill(0)));
	const [B, setB] = useState<number[]>(() => new Array(size).fill(0));
	const [ans, setAns] = useState<number[]>();

	useEffect(() => {
		document.title = "Cramer";
	}, []);

	useEffect(() => {
		console.log(A);
	}, [A]);
	useEffect(() => {
		// setA(() => Array.from({ length: size }, () => new Array(size).fill(0)));
		setA(() => new Array(size).fill(new Array(size).fill(0)));
		setB(() => new Array(size).fill(0));
	}, [size]);

	const fetchAnswer = () => {
		axios
			.post("http://localhost:8080/cramer", {
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
			<h2>Cramer</h2>
			<TextField
				variant="outlined"
				label="Size m*m"
				type="number"
				value={size}
				onChange={(e) => {
					setSize(Math.max(Math.min(Number(e.target.value), 100), 0));
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
				<Box padding={"2em"} display={"flex"} justifyContent={"space-between"}>
					<Box className="A">
						<h3>A</h3>
						{A.map((row, rowIndex) => {
							return (
								<Box
									key={rowIndex}
									width="100%"
									display="flex"
									justifyContent="space-around"
									// gap="2em"
								>
									{row.map((col, colIndex) => {
										return (
											<TextField
												type="number"
												sx={{ maxWidth: 120 }}
												key={`${rowIndex},${colIndex}`}
												value={A[rowIndex][colIndex]}
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
					<Box minWidth={"1em"}></Box>
					<Box className="B" display={"flex"} flexDirection={"column"}>
						<h3>B</h3>
						{B.map((value, colIndex) => {
							return (
								<TextField
									type="number"
									sx={{ maxWidth: 120 }}
									key={`${colIndex}`}
									value={value}
									onChange={(e) => {
										const newValue = Number(e.target.value);
										handleBChange(colIndex, newValue);
									}}
								/>
							);
						})}
					</Box>
				</Box>
				<Button variant="contained" type="submit">
					Submit
				</Button>
			</form>
			<Stack spacing={2}>
				<h3>Answer</h3>
				<Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
					{ans?.map((value, index) => (
						<h4 key={index}>
							x{index} = {value}
						</h4>
					))}
				</Box>
			</Stack>
		</Stack>
	);
}

export default Cramer;
