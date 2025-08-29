import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import Activity from "./components/Activity";

function App() {
	const [user, setUser] = useState("");
	const [avatarURL, setAvatarURL] = useState("");
	const theme = createTheme({
		palette: {
			primary: {
				main: "#7886C7",
				light: "#7886C7",
				dark: "#2D336B",
			},
			secondary: {
				main: "#A9B5DF",
			},
			background: {
				default: "#A9B5DF",
				paper: "#e7eff8",
			},
			text: {
				primary: "#2D336B",
				secondary: "#2D336B",
			},
		},
	});
	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(storedUser);
		}
		const storedAvatar = localStorage.getItem("avatar");
		if (storedAvatar) {
			setAvatarURL(storedAvatar);
		}
	}, []);

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<NavBar user={user} avatarURL={avatarURL} />
				<Routes>
					<Route
						path="/"
						element={
							<Home user={user} setUser={setUser} setAvatarURL={setAvatarURL} />
						}
					/>
					<Route
						path="/home"
						element={
							<Home user={user} setUser={setUser} setAvatarURL={setAvatarURL} />
						}
					/>
					<Route path="/gallery" element={<Gallery />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/activity" element={<Activity />} />
					<Route path="*" element={<p>Page not found :\</p>} />
				</Routes>
			</ThemeProvider>
		</>
	);
}

export default App;
