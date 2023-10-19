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
			<input
				type="number"
				value={size}
				onChange={(e) => {
					setSize(() => {
						return Number(e.target.value);
					});
				}}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log(A);
				}}
			>
				{A.map((row, rowIndex) => {
					return (
						<div key={rowIndex}>
							{A[rowIndex].map((col, colIndex) => {
								return (
									<input
										type="number"
										key={`${rowIndex},${colIndex}`}
										value={A[rowIndex][colIndex]}
										onChange={(e) => {
											const newValue = Number(e.target.value);
											handleMatrixChange(rowIndex, colIndex, newValue);
										}}
									/>
								);
							})}
						</div>
					);
				})}
			</form>
			<button type="submit">Submit</button>
		</>
	);
}

export default Cramer;
