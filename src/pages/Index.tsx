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
			name: "Cramer rule",
			path: "/linear/cramer",
			description: "answer of linear equation using Cramer rule",
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
			description: "linear equation using gauss-seidel method",
		},
		{
			name: "LU Method",
			path: "/linear/lu-decomposition",
			description: "LU decomposition method",
		},
		{
			name: "Jacobi",
			path: "/linear/jacobi",
			description: "Jacobi method",
		},
	];

	const interpolation: IndexCardProps[] = [
		{
			name: "Newton interpolation",
			path: "/interpolation/newton",
			description: "Newton interpolation",
		},
		{
			name: "Langange",
			path: "/interpolation/langange",
			description: "Langange interpolation",
		},
		{
			name: "Spline(Linear)",
			path: "/interpolation/spline-linear",
			description: "Langange interpolation",
		},
		{
			name: "Spline(Quadratic)",
			path: "/interpolation/spline-quadratic",
			description: "Langange interpolation",
		},
	];
	const regression: IndexCardProps[] = [
		{
			name: "Least Square",
			path: "/regression",
			description: "Least Square",
		},
		{
			name: "Multiple Least Square",
			path: "/mul-regression",
			description: "Least Square",
		},
	];
	const differentiation: IndexCardProps[] = [
		{
			name: "First derivative",
			path: "/diff",
			description: "find diff",
		},
	];
	return (
		<Stack spacing={2}>
			<h1>Root of equation</h1>
			<Stack direction={"row"} flexWrap={"wrap"} gap={2} sx={{ justifyContent: "center" }}>
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
			<Stack direction={"row"} flexWrap={"wrap"} gap={2} sx={{ justifyContent: "center" }}>
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
			<Divider />
			<h1>Interpolation</h1>
			<Stack direction={"row"} flexWrap={"wrap"} gap={2} sx={{ justifyContent: "center" }}>
				{interpolation?.map((card, index) => {
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
			<h1>Regression</h1>
			<Stack direction={"row"} flexWrap={"wrap"} gap={2} sx={{ justifyContent: "center" }}>
				{regression?.map((card, index) => {
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
			<h1>Differentiation</h1>
			<Stack direction={"row"} flexWrap={"wrap"} gap={2} sx={{ justifyContent: "center" }}>
				{differentiation?.map((card, index) => {
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
