import { Stack, Divider } from "@mui/material";
import { NavigateFunction } from "react-router-dom";
import HubCard from "../Component/HubCard";
import { IndexCardProps } from "../type and interface/type";

function Index({ navigate }: { navigate: NavigateFunction }) {
	document.title = "Index";
	const roe: IndexCardProps[] = [
		{
			name: "Graphical",
			path: "/root/graphical",
			description: "root of equation by graphical",
		},
		{
			name: "Bisection",
			path: "/root/bisection",
			description: "root of equation by bisection",
		},
		{
			name: "One Point Iteration",
			path: "/root/one-point",
			description: "root of equation by one point iteration",
		},
		{
			name: "Newton Raphson",
			path: "/root/newton-raphson",
			description: "root of equation by one point newton raphson",
		},
		{
			name: "Secant",
			path: "/root/secant",
			description: "root of equation by secant method",
		},
	];
	const linear: IndexCardProps[] = [
		{
			name: "Cramer Method",
			path: "/linear/cramer",
			description: "answer of linear equation using Cramer method",
		},
		{
			name: "Guass Method",
			path: "/linear/gauss",
			description: "answer of linear equation using Guass method",
		},
		{
			name: "Guass-jordan Method",
			path: "/linear/gauss-jordan",
			description: "answer of linear equation using Guass-jordan method",
		},
		{
			name: "Inversion Method",
			path: "/linear/inversion",
			description: "answer of linear equation using Matrix Inversion method",
		},
		{
			name: "Gauss-seidel Method",
			path: "/linear/gauss-seidel",
			description: "answer of linear equation using gauss-seidel method",
		},
	];

	return (
		<Stack spacing={2}>
			<h1>Root of equation</h1>
			<Stack direction={"row"} spacing={2} sx={{ justifyContent: "center" }}>
				{roe?.map((card, index) => {
					return (
						<HubCard
							key={index}
							name={card.name}
							path={card.path}
							desciption={card.description}
							navigate={navigate}
						/>
					);
				})}
			</Stack>
			<Divider />
			<h1>Linear Equation</h1>
			<Stack direction={"row"} spacing={2} sx={{ justifyContent: "center" }}>
				{linear?.map((card, index) => {
					return (
						<HubCard
							key={index}
							name={card.name}
							path={card.path}
							desciption={card.description}
							navigate={navigate}
						/>
					);
				})}
			</Stack>
		</Stack>
	);
}

export default Index;
