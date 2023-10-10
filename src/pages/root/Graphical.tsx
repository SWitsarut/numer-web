import React, { useState, useRef } from "react";
import axios from "axios";
import { Button, Stack, TextField } from "@mui/material";
import Plot from "react-plotly.js";
import { compile } from "mathjs";
import { GraphicalRes } from "../../type and interface/type";

function Graphical() {
	document.title = "Graphical";
	const [answerState, setAnwerState] = useState<GraphicalRes>();
	const [isLoading, setLoading] = useState<boolean>();

	const xl = useRef<HTMLInputElement>();
	const xr = useRef<HTMLInputElement>();
	const question = useRef<HTMLInputElement>();

	const GraphX: number[] = [];
	const GraphY: number[] = [];
	const fetchAnswer = async () => {
		setLoading(true);
		try {
			const response = await axios.post<GraphicalRes>(`http://localhost:8080/graphical`, {
				question: question.current?.value,
				xl: Number(xl.current?.value),
				xr: Number(xr.current?.value),
			});

			// Log the response to check its structure
			console.log("Response from server:", response);

			// Extract data from the response
			const data = response.data;

			// Log the extracted data
			console.log("Extracted data:", data);

			setAnwerState(data);
			setLoading(false);
		} catch (err) {
			console.error("Error fetching data:", err);
			setLoading(false);
		}
	};

	return (
		<Stack spacing={2}>
			<h2>Graphical</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					fetchAnswer();
					const fn = compile(question.current?.value || "");
					const valXl = Number(xl.current?.value || 0);
					const valXr = Number(xr.current?.value || 10);
					for (let i = valXl; i <= valXr; i += 0.1) {
						GraphX.push(i);
						GraphY.push(fn.evaluate({ x: i }));
					}
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
				<Plot
					data={[
						{
							name: "graph",
							x: GraphX,
							y: GraphY,
							type: "scatter",
							mode: "lines",
							line: { color: "red" },
							showlegend: false,
						},
						{
							name: "answer",
							mode: "markers",
							x: [Number(answerState?.data)], // Display a marker at the root
							y: [0], // At y = 0
							marker: {
								symbol: "x", // Use 'x' symbol for the marker
								size: 10,
								color: "green",
							}, // Customize the color of the marker
						},
					]}
					layout={{ height: 500 }}
				/>
			</Stack>
		</Stack>
	);
}

export default Graphical;
