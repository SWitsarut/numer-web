import { Stack, Divider } from "@mui/material";
import { NavigateFunction } from "react-router-dom";
import HubCard from "../Component/HubCard";
import { IndexCardProps } from "../type and interface/type";

function Index({ navigate }: { navigate: NavigateFunction }) {
	document.title = "Index";
	const roe: IndexCardProps[] = [
		{
			name: "Graphical",
			path: "/graphical",
			description: "root of equation by graphical",
		},
		{
			name: "Bisection",
			path: "/bisection",
			description: "root of equation by bisection",
		},
		{
			name: "One Point Iteration",
			path: "/one-point",
			description: "root of equation by one point iteration",
		},
		{
			name: "Newton Raphson",
			path: "/newton-raphson",
			description: "root of equation by one point newton raphson",
		},
		{
			name: "Secant",
			path: "/secant",
			description: "root of equation by secant method",
		},
		{
			name: "Test",
			path: "/test",
			description: "test",
		},
	];

	return (
		<Stack spacing={2}>
			<h2>Root of equation</h2>
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
			<h2>AX+B</h2>
		</Stack>
	);
}

export default Index;
