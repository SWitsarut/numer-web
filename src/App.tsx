import { Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";
import Index from "./pages/Index";
import Page404 from "./pages/Page404";
import Navbar from "./Component/Navbar";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

import Graphical from "./pages/root/Graphical";
import Bisection from "./pages/root/Bisection";
import OnePoint from "./pages/root/OnePoint";
import NewtomRaphson from "./pages/root/NewtonRaphson";
function App() {
	const navigate: NavigateFunction = useNavigate();
	return (
		<>
			<Navbar navigate={navigate} />
			<Box margin="5rem auto" maxWidth="90rem">
				<Paper sx={{ padding: 3 }} elevation={1}>
					<Routes>
						<Route path="/" element={<Index navigate={navigate} />} />
						<Route path="/bisection" element={<Bisection />} />
						<Route path="/graphical" element={<Graphical />} />
						<Route path="/one-point" element={<OnePoint />} />
						<Route path="/newton-raphson" element={<NewtomRaphson />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</Paper>
			</Box>
		</>
	);
}

export default App;
