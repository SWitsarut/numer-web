import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
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
import Cramer from "./pages/linear equation/Cramer";

function App() {
	const navigate = useNavigate();
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

							<Route
								path="/root"
								element={
									<Outlet /> // Render nested routes
								}
							>
								<Route path="bisection" element={<Bisection />} />
								<Route path="graphical" element={<Graphical />} />
								<Route path="one-point" element={<OnePoint />} />
								<Route path="newton-raphson" element={<NewtomRaphson />} />
								<Route path="secant" element={<Secant />} />
							</Route>

							<Route
								path="/linear"
								element={
									<Outlet /> // Render nested routes
								}
							>
								<Route path="cramer" element={<Cramer />} />
							</Route>

							<Route path="*" element={<Page404 />} />
						</Routes>
					</Paper>
				</Box>
			</Box>
		</>
	);
}

export default App;
