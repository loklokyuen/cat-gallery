import { Button } from "@mui/material";
import Form from "../components/Form";
import { NavLink } from "react-router";

export default function Home({ user, setUser, setAvatarURL }) {
	return (
		<>
			<section>
				<h2>Welcome to Cat Gallery!</h2>
				<p>Discover adorable cat images from around the world.</p>
				{user ? (
					<>
						<p>Great to see you again {user}!</p>
						<NavLink to="/gallery">
							<Button
								variant="contained"
								color="primary"
								sx={{ ":hover": { backgroundColor: "#A9B5DF" } }}>
								Go to Gallery
							</Button>
						</NavLink>
						<Button
							variant="outlined"
							color="primary"
							sx={{
								margin: "10px",
								backgroundColor: "#fff",
								":hover": { backgroundColor: "#7886C7", color: "#2D336B" },
							}}
							onClick={() => {
								localStorage.clear();
								setUser("");
								setAvatarURL("");
							}}>
							Clear my session
						</Button>
					</>
				) : (
					<Form setUser={setUser} setAvatarURL={setAvatarURL}></Form>
				)}
			</section>
		</>
	);
}
