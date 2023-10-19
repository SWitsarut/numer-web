import { Box, TextField, Stack, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function Cramer() {
	const [size, setSize] = useState<number>(3);
	const [A, setA] = useState<number[][]>([[]]);
	const [B, setB] = useState<number[]>([]);

	useEffect(() => {
		document.title = "Cramer";
	}, []);

	useEffect(() => {
		setA(new Array(size).fill(new Array(size).fill(0)));
	}, [size]);
	const fetchAnswer = async () => {
		await axios.post("http://localhost:8080/cramer", {}).then((e) => {
			e.status;
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

	return (
		<>
			<TextField
				variant="outlined"
				label="Size m*m"
				type="number"
				value={size}
				onChange={(e) => {
					setSize(() => {
						return Math.max(Number(e.target.value), 0);
					});
				}}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log(A);
				}}
			>
				<Stack spacing={2} padding={"2em"}>
					{A.map((row, rowIndex) => {
						return (
							<Box
								key={rowIndex}
								width="100%"
								display={"flex"}
								justifyContent={"space-evenly"}
								gap="2em"
							>
								{A[rowIndex].map((col, colIndex) => {
									return (
										<TextField
											type="number"
											sx={{ maxWidth: 120 }}
											key={`${rowIndex},${colIndex}`}
											value={A[rowIndex][colIndex]}
											onChange={(e) => {
												const newValue = Number(e.target.value);
												handleMatrixChange(rowIndex, colIndex, newValue);
											}}
										/>
									);
								})}
							</Box>
						);
					})}
				</Stack>
				<Button variant="contained" type="submit">Submit</Button>
			</form>
		</>
	);
}

export default Cramer;
