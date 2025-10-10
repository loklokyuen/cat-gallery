import {
	Button,
	Card,
	MenuItem,
	Stack,
	Tab,
	Tabs,
	TextField,
	Switch,
	FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { NavLink } from "react-router";
import { signIn, signUp } from "../libs/auth";
import { ensureUserDoc } from "../libs/ensureUserDoc";
import { auth } from "../libs/firebase";

export default function Form({ setUser, setAvatarURL }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [avatarLink, setAvatarLink] = useState("");
	const [catLikingLevel, setCatLikingLevel] = useState("");
	const [currentTab, setCurrentTab] = useState("1");
	const [modeIsSignup, setModeIsSignup] = useState(true);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState("");

	const catLikingOptions = ["Very much", "Okay", "Meh.."];

	async function handleAuthSubmit(e) {
		e.preventDefault();
		setErr("");
		setLoading(true);
		try {
			const cred = modeIsSignup
				? await signUp(email.trim(), password)
				: await signIn(email.trim(), password);

			const { user } = cred;
			await ensureUserDoc(user.uid, user.email, {
				avatarURL: avatarLink || null,
				catLikingLevel: catLikingLevel || null,
			});

			setAvatarURL(avatarLink);
			setUser(user.email);
		} catch (error) {
			console.error("AUTH ERROR", {
				code: error.code,
				message: error.message,
				full: error,
			});
			setErr(error.code || error.message);
		} finally {
			setLoading(false);
		}
	}

	function handleGuestSubmit() {
		localStorage.setItem("user", "guest");
		localStorage.setItem("avatarURL", avatarLink);
		setAvatarURL(avatarLink);
		setUser("guest");
	}

	function handleTabChange(_, v) {
		setCurrentTab(v);
	}

	return (
		<Card sx={{ p: 2 }}>
			<Tabs
				value={currentTab}
				onChange={handleTabChange}
				aria-label="tabs of signing in or as a guest"
				textColor="primary">
				<Tab label="Email Login / Sign Up" value="1" />
				<Tab label="Continue as Guest" value="2" />
			</Tabs>

			<TabContext value={currentTab}>
				<TabPanel value="1">
					<form onSubmit={handleAuthSubmit}>
						<Stack alignItems="center" spacing={1.5}>
							<FormControlLabel
								control={
									<Switch
										checked={modeIsSignup}
										onChange={(e) => setModeIsSignup(e.target.checked)}
									/>
								}
								label={modeIsSignup ? "Mode: Sign Up" : "Mode: Login"}
							/>

							<TextField
								fullWidth
								label="Email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								sx={{ width: 300 }}
								required
							/>
							<TextField
								fullWidth
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								sx={{ width: 300 }}
								required
								helperText={modeIsSignup ? "At least 6 characters " : " "}
							/>
							{modeIsSignup && (
								<Stack alignItems="center" spacing={1.5}>
									<TextField
										select
										label="How much do you like cats?"
										value={catLikingLevel}
										onChange={(e) => setCatLikingLevel(e.target.value)}
										fullWidth
										sx={{ width: 300 }}>
										{catLikingOptions.map((option) => (
											<MenuItem key={option} value={option}>
												{option}
											</MenuItem>
										))}
									</TextField>
									<TextField
										fullWidth
										label="Avatar URL (optional)"
										value={avatarLink}
										onChange={(e) => setAvatarLink(e.target.value)}
										sx={{ width: 300 }}
										placeholder="https://…"
									/>
								</Stack>
							)}
							<Button
								variant="contained"
								color="primary"
								type="submit"
								disabled={loading}
								sx={{ mt: 1, ":hover": { backgroundColor: "#A9B5DF" } }}>
								{loading ? "Please wait…" : modeIsSignup ? "Sign Up" : "Login"}
							</Button>
							{err && <p style={{ color: "crimson" }}>{err}</p>}
						</Stack>
					</form>
				</TabPanel>

				<TabPanel value="2">
					<p>You can browse cat photos without an account.</p>
					<Stack direction="row" spacing={1}>
						<Button variant="outlined" onClick={handleGuestSubmit}>
							Continue as Guest
						</Button>
						<NavLink to="/gallery">
							<Button
								variant="contained"
								color="primary"
								sx={{ ":hover": { backgroundColor: "#A9B5DF" } }}>
								Go to Gallery
							</Button>
						</NavLink>
					</Stack>
				</TabPanel>
			</TabContext>
		</Card>
	);
}
