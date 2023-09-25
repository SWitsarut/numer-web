import { Stack } from "@mui/material";
import { NavigateFunction } from "react-router-dom";
import HubCard from "../Component/HubCard";
import { IndexCardProps } from "../type and interface/type";

function Index({ navigate }: { navigate: NavigateFunction }) {
	const roe: IndexCardProps[] = [
		{
			name: "Bisection",
			path: "/bisection",
			description: "root of equation by bisection",
		},
		{
			name: "Bisection",
			path: "/bisection",
			description: "root of equation by bisection",
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
			<h2>AX+B</h2>
		</Stack>
	);
}

export default Index;