import { Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";
import Index from "./pages/Index";
import Navbar from "./Component/Navbar";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

import Graphical from "./pages/root/Graphical";
import Bisection from "./pages/root/Bisection";
import OnePoint from "./pages/root/OnePoint";
import NewtomRaphson from "./pages/root/NewtonRaphson";
import Secant from "./pages/root/Secant";
import Page404 from "./pages/Page404";

function App() {
	const navigate: NavigateFunction = useNavigate();
	return (
		<>
			<Box
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === "light"
							? theme.palette.grey[100]
							: theme.palette.grey[900],
				}}
			>
				<Navbar navigate={navigate} />
				<Box padding={"3rem"} margin={"auto"} maxWidth={"70rem"}>
					<Paper sx={{ padding: 3, minHeight: "100vh" }} elevation={1}>
						<Routes>
							<Route path="/" element={<Index navigate={navigate} />} />
							<Route path="/bisection" element={<Bisection />} />
							<Route path="/graphical" element={<Graphical />} />
							<Route path="/one-point" element={<OnePoint />} />
							<Route path="/newton-raphson" element={<NewtomRaphson />} />
							<Route path="/secant" element={<Secant />} />
							<Route path="*" element={<Page404 />} />
						</Routes>
					</Paper>
				</Box>
			</Box>
		</>
	);
}

export {};
export default App;
