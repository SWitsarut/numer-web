import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Navbar from "./Component/Navbar";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import "katex/dist/katex.min.css";

import Graphical from "./pages/root/Graphical";
import Bisection from "./pages/root/Bisection";
import OnePoint from "./pages/root/OnePoint";
import NewtomRaphson from "./pages/root/NewtonRaphson";
import Secant from "./pages/root/Secant";
import Page404 from "./pages/Page404";
import Matrix from "./pages/linear equation/Matrix";
import Interpolation from "./pages/Interpolation/Interpolation";
import Diff from "./pages/Diff/Diff";
import Least_Square from "./pages/Regression/Least_Square";
import Mul_regression from "./pages/Regression/mul_regression";

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
								<Route path="cramer" element={<Matrix path={"cramer"} />} />
								<Route path="gauss" element={<Matrix path={"gauss"} />} />
								<Route
									path="gauss-jordan"
									element={<Matrix path={"gauss-jordan"} />}
								/>
								<Route path="inversion" element={<Matrix path={"inversion"} />} />
								<Route
									path="gauss-seidel"
									element={<Matrix path={"gauss-seidel"} />}
								/>
								<Route
									path="lu-decomposition"
									element={<Matrix path={"lu-decomposition"} />}
								/>
								<Route path="jacobi" element={<Matrix path={"jacobi"} />} />
							</Route>
							<Route
								path="/interpolation"
								element={
									<Outlet /> // Render nested routes
								}
							>
								<Route
									path="langange"
									element={<Interpolation path={"langange"} />}
								/>
								<Route path="newton" element={<Interpolation path={"newton"} />} />
								<Route
									path="spline-linear"
									element={<Interpolation path={"spline-linear"} />}
								/>
								<Route
									path="spline-quadratic"
									element={<Interpolation path={"spline-quadratic"} />}
								/>
							</Route>
							<Route path="/regression" element={<Least_Square />} />
							<Route path="/mul-regression" element={<Mul_regression />} />
							<Route path="/diff" element={<Diff />} />
							<Route path="*" element={<Page404 />} />
						</Routes>
					</Paper>
				</Box>
			</Box>
		</>
	);
}

export default App;
