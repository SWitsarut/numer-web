import { Card, CardActionArea, CardContent, Box, Typography } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import HubCardProps from "../type and interface/interface";

function HubCard({ path, name, desciption, navigate }: HubCardProps) {
	return (
		<Card
			sx={{
				backgroundColor: (theme) =>
					theme.palette.mode === "light"
						? theme.palette.grey[100]
						: theme.palette.grey[900],
				width: 200,
				height: 200,
				borderRadius: 1,
			}}
			onClick={() => navigate(path)}
		>
			<CardActionArea sx={{ height: 200 }}>
				<CardContent>
					<Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
						<EqualizerIcon fontSize="large" />
					</Box>
					<Typography gutterBottom variant="h5" component="div">
						{name}
					</Typography>
					<Typography gutterBottom variant="body2" component="div">
						{desciption}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default HubCard;
