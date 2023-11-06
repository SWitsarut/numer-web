import { Component } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

import {
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import { EvalFunction, compile } from "mathjs";
import { BlockMath } from "react-katex";
interface iterationData {
	iteration: number;
	xl: number;
	fxl: number;
	xm: number;
	fxm: number;
	xr: number;
	fxr: number;
	error?: number;
}

interface BisectionRes {
	data: number | string;
	iterationData: iterationData[];
}

type MyState = {
	xl: number | undefined;
	xr: number | undefined;
	question: string | undefined;
	questionNumber: number;
	resData: BisectionRes | null;
};
class Bisection extends Component<NonNullable<unknown>, MyState> {
	// xl: RefObject<HTMLInputElement> = React.createRef();
	// question: RefObject<HTMLInputElement> = React.createRef();
	// xr: RefObject<HTMLInputElement> = React.createRef();
	GraphX: number[] = [];
	GraphY: number[] = [];
	constructor(props: NonNullable<unknown>) {
		super(props);

		this.state = {
			xl: 0,
			xr: 0,
			question: "",
			questionNumber: 1,
			resData: null,
		};
	}

	// componentDidMount() {
	// 	if (this.xl.current) {
	// 		this.xl.current.focus();
	// 	}
	// }

	getData = async (question: string, xl: number, xr: number): Promise<void> => {
		if (!question || isNaN(xl) || isNaN(xr)) {
			// Input validation
			alert("Please enter valid values.");
			return;
		}

		try {
			const response = await axios.post<BisectionRes>(`http://localhost:8080/bisection`, {
				question,
				xl,
				xr,
			});

			this.setState({ resData: response.data });
			console.log(response.data);
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while fetching data.");
		}
	};

	render() {
		const { resData } = this.state as { resData: BisectionRes };
		const { question } = this.state as { question: string };
		const { xl } = this.state as { xl: number };
		const { xr } = this.state as { xr: number };
		const { questionNumber } = this.state as { questionNumber: number };
		document.title = "Bisection";
		return (
			<Stack sx={{ gap: 2 }}>
				<h2>Bisection</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						// const question = this.question.current?.value || "";
						// const xl = parseFloat(this.xl.current?.value || "0");
						// const xr = parseFloat(this.xr.current?.value || "0");
						const fn: EvalFunction = compile(question);
						this.getData(question, xl, xr);
						for (let i = xl; i < xr; i += 0.1) {
							this.GraphX.push(i);
							this.GraphY.push(fn.evaluate({ x: i }));
						}
					}}
				>
					<Stack sx={{ gap: 2 }}>
						<TextField
							value={question}
							onChange={(e) => {
								this.setState({ question: e.target.value });
							}}
							label="Question"
							variant="outlined"
						/>
						<TextField
							value={xl}
							onChange={(e) => {
								this.setState({ xl: Number(e.target.value) });
							}}
							label="XL"
							variant="outlined"
							type="number"
						/>
						<TextField
							value={xr}
							onChange={(e) => {
								this.setState({ xr: Number(e.target.value) });
							}}
							label="XR"
							variant="outlined"
							type="number"
						/>
						<Button variant="contained" type="submit">
							Calculate
						</Button>
					</Stack>
				</form>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						axios.get(`http://localhost:8080/bisection/${questionNumber}`).then((e) => {
							console.log(e.data);
							const { data } = e;
							this.setState({ xl: data.xl, xr: data.xr, question: data.question });
						});
					}}
				>
					<Stack direction={"row"} spacing={2}>
						<TextField
							value={questionNumber}
							onChange={(e) => {
								const num = Math.max(Number(e.target.value), 1);
								this.setState({ questionNumber: num });
							}}
							label={"question number"}
							type="number"
							fullWidth
						/>
						<Button variant="contained" type="submit" fullWidth>
							Get Question
						</Button>
					</Stack>
				</form>
				<Stack spacing={2}>
					<Plot
						data={[
							{
								name: "graph",
								x: this.GraphX,
								y: this.GraphY,
								marker: { color: "red" },
								showlegend: false,
							},
							{
								name: "answer",
								type: "scatter",
								mode: "lines",
								x: [resData?.data, resData?.data], // This creates a vertical line at y = 0
								y: [Math.min(...this.GraphY) - 5, Math.max(...this.GraphY) + 5],
								line: { color: "blue" }, // You can customize the line style
								showlegend: false,
							},
							{
								name: "answer",
								mode: "markers",
								x: [resData?.data], // Display a marker at the root
								y: [0], // At y = 0
								marker: {
									symbol: "x", // Use 'x' symbol for the marker
									size: 10,
									color: "green",
								},
								showlegend: false,
							},
						]}
						layout={{ height: 500 }}
					/>

					{/* <h2>{resData?.data}</h2> */}
					{resData ? <BlockMath>{`x=${resData?.data}`}</BlockMath> : null}
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Iteration</TableCell>
									{/* <TableCell align="center">XL</TableCell> */}
									<TableCell align="center">f(XL)</TableCell>
									<TableCell align="center">XM</TableCell>
									<TableCell align="center">f(XM)</TableCell>
									{/* <TableCell align="center">XR</TableCell> */}
									<TableCell align="center">f(XR)</TableCell>
									<TableCell align="center">Error</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{resData?.iterationData?.map(
									(data: iterationData, index: number) => (
										<TableRow
											key={index}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}
										>
											<TableCell component="th" scope="row">
												{data.iteration}
											</TableCell>
											{/* <TableCell align="center">{data.xl}</TableCell> */}
											<TableCell align="center">{data.fxl}</TableCell>
											<TableCell align="center">{data.xm}</TableCell>
											<TableCell align="center">{data.fxm}</TableCell>
											{/* <TableCell align="center">{data.xr}</TableCell> */}
											<TableCell align="center">{data.fxr}</TableCell>
											<TableCell align="center">{data.error}</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Stack>
			</Stack>
		);
	}
}

export default Bisection;
