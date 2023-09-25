import { Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";
import Bisection from "./pages/Bisection";
import Index from "./pages/Index";
import Page404 from "./pages/Page404";
import Navbar from "./Component/Navbar";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

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
						<Route path="*" element={<Page404 />} />
					</Routes>
				</Paper>
			</Box>
		</>
	);
}

export default App;
