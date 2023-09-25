import { NavigateFunction, useLocation } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
function Navbar({ navigate }: { navigate: NavigateFunction }) {
	const Location = useLocation();
	const currentPath = Location.pathname;
	return (
		<AppBar position="static">
			<Toolbar sx={{ backgroundColor: "white", color: "black" }}>
				<IconButton
					onClick={() => navigate(-1)}
					edge="start"
					color="inherit"
					aria-label="back"
					sx={{ mr: 2 }}
				>
					<ArrowBackIcon />
				</IconButton>
				<Typography
					sx={{ flexGrow: 1 }}
					id="NavTypography"
					variant="h6"
					color="inherit"
					component="div"
				>
					<Box
						display="flex"
						flexGrow="1"
						justifyContent="space-between"
						alignItems="center"
					>
						<Box>{currentPath}</Box>
						<IconButton
							color="inherit"
							aria-label="menu"
							onClick={() => {
								navigate("/");
							}}
						>
							<SpaceDashboardIcon />
						</IconButton>
					</Box>
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
