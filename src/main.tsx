import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";

const darkTheme: ThemeOptions = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#006064",
		},
		secondary: {
			main: "#f50057",
		},
		divider: "rgba(255,255,255,0.3)",
	},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={darkTheme}>
				{/* <CssBaseline /> */}
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
