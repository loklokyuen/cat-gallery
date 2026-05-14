import { Box, Button, Card, CardActionArea, CardContent, Grid2, Typography } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Form from "../components/Form";
import { NavLink } from "react-router";

const quickLinks = [
	{ label: "Gallery", description: "Browse and like cats", icon: <CollectionsIcon fontSize="large" />, to: "/gallery" },
	{ label: "Profile", description: "Your favourites", icon: <FavoriteIcon fontSize="large" />, to: "/profile" },
	{ label: "Activity", description: "Cats you've liked", icon: <PersonIcon fontSize="large" />, to: "/activity" },
];

export default function Home({ user, setUser, setAvatarURL }) {
	return (
		<>
			<section>
				<h2>Welcome to Cat Gallery!</h2>
				<p>Discover adorable cat images from around the world.</p>
				{user ? (
					<>
						<Typography variant="body1" sx={{ mb: 2 }}>
							Good to see you, <strong>{user}</strong>!
						</Typography>
						<Grid2 container spacing={2} sx={{ mb: 3 }}>
							{quickLinks.map(({ label, description, icon, to }) => (
								<Grid2 key={label} xs={12} sm={4}>
									<Card sx={{ height: "100%" }}>
										<CardActionArea component={NavLink} to={to} sx={{ height: "100%" }}>
											<CardContent sx={{ textAlign: "center" }}>
												<Box sx={{ color: "primary.main", mb: 1 }}>{icon}</Box>
												<Typography variant="h6">{label}</Typography>
												<Typography variant="body2" color="text.secondary">
													{description}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</Grid2>
							))}
						</Grid2>
						<Button
							variant="outlined"
							color="primary"
							sx={{
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
					<Form setUser={setUser} setAvatarURL={setAvatarURL} />
				)}
			</section>
		</>
	);
}
