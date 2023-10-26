import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

type props = {
	path: string;
};

function Interpolation({ path }: props) {
	const [x, setX] = useState<number[]>([]);
	const [y, setY] = useState<number[]>([]);
	const [size, setSize] = useState<number>(5);
	const [answer, setAnswer] = useState<number>();
	const targetX = useRef<HTMLInputElement>();

	const fetchAnswer = () => {
		axios
			.post(`http://localhost:8080/${path}`, {
				x,
				y,
				targetX: Number(targetX.current?.value),
			})
			.then((e) => {
				console.log(e.data);
				setAnswer(e.data);
			});
	};
	useEffect(() => {
		document.title = path.charAt(0).toUpperCase() + path.slice(1);
	}, [path]);

	useEffect(() => {
		setX(new Array(size).fill(0));
		setY(new Array(size).fill(0));
	}, [size]);

	// const handleArrChange = (colIndex: number, newValue: number) => {
	// 	setX((prevB) => {
	// 		const newB = prevB.map((value, i) => (i === colIndex ? newValue : value));
	// 		return newB;
	// 	});
	// };
	return (
		<Stack spacing={2}>
			<h2>{path.charAt(0).toUpperCase() + path.slice(1)}</h2>
			<TextField
				variant="outlined"
				type="number"
				value={size}
				onChange={(e) => {
					const value = Number(e.target.value);
					setSize(Math.min(Math.max(value, 0), 20));
				}}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					// console.log(x);
					fetchAnswer();
				}}
			>
				<Stack spacing={2} textAlign={"center"}>
					<Stack direction={"row"} gap={2} justifyContent={"center"}>
						<Stack
							sx={{ width: "100%" }}
							display={"flex"}
							flexWrap={"wrap"}
							gap={2}
							textAlign={"center"}
						>
							<h3>X</h3>
							{x?.map((value, index) => {
								return (
									<TextField
										variant="outlined"
										type="number"
										key={index}
										value={value}
										label={`x${index}`}
										onChange={(e) => {
											const newValue = Number(e.target.value);
											setX((prev) => {
												const newB = prev.map((value, i) =>
													i === index ? newValue : value
												);
												return newB;
											});
										}}
									/>
								);
							})}
						</Stack>
						<Stack
							display={"flex"}
							sx={{ width: "100%" }}
							flexWrap={"wrap"}
							gap={2}
							textAlign={"center"}
						>
							<h3>Y</h3>
							{y?.map((value, index) => {
								return (
									<TextField
										sx={{ minWidth: "50%" }}
										variant="outlined"
										type="number"
										key={index}
										value={value}
										label={`y${index}`}
										onChange={(e) => {
											const newValue = Number(e.target.value);
											setX((prev) => {
												const newB = prev.map((value, i) =>
													i === index ? newValue : value
												);
												return newB;
											});
										}}
									/>
								);
							})}
						</Stack>
					</Stack>
					<TextField
						variant="outlined"
						type="number"
						inputRef={targetX}
						label="x เป้าหมาย"
						required
					/>
					<Button variant="contained" type="submit">
						Submit
					</Button>
					<h2>
						{answer != null || answer != undefined
							? `f(${targetX.current?.value}) = ${answer}`
							: null}
					</h2>
				</Stack>
			</form>
		</Stack>
	);
}

export default Interpolation;
