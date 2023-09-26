import React, { Component, RefObject } from "react";
import axios from "axios";

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

class Bisection extends Component {
	xl: RefObject<HTMLInputElement> = React.createRef();
	question: RefObject<HTMLInputElement> = React.createRef();
	xr: RefObject<HTMLInputElement> = React.createRef();

	constructor(props: any) {
		super(props);

		this.state = {
			resData: null,
		};
	}

	componentDidMount() {
		if (this.xl.current) {
			this.xl.current.focus();
		}
	}

	getData = async (): Promise<void> => {
		const question = this.question.current?.value || "";
		const xl = parseFloat(this.xl.current?.value || "0");
		const xr = parseFloat(this.xr.current?.value || "0");

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
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while fetching data.");
		}
	};

	render() {
		const { resData } = this.state as { resData: BisectionRes };

		return (
			<Stack sx={{ gap: 2 }}>
				<h2>Bisection</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						this.getData();
					}}
				>
					<Stack sx={{ gap: 2 }}>
						<TextField inputRef={this.question} label="Question" variant="outlined" />
						<TextField inputRef={this.xl} label="XL" variant="outlined" type="number" />
						<TextField inputRef={this.xr} label="XR" variant="outlined" type="number" />
						<Button variant="contained" type="submit">
							Calculate
						</Button>
					</Stack>
				</form>
				<Stack spacing={2}>
					<h2>{resData?.data}</h2>
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
