import { useEffect, useState } from "react";
import { Alert, Box, Grid2, Skeleton, Typography } from "@mui/material";
import { getFavourites, getOrCreateSubId } from "../libs/catApi";

export default function Profile() {
	const [favourites, setFavourites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const subId = getOrCreateSubId();
		if (!subId) {
			setError("Could not resolve user id for favourites.");
			setLoading(false);
			return;
		}
		getFavourites(subId)
			.then((data) => {
				setFavourites(data || []);
			})
			.catch((err) => {
				console.error("Error fetching favourites", err);
				setError("Unable to load favourites right now.");
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<section>
			<h2>Profile</h2>
			<Typography variant="body1" sx={{ mb: 1 }}>
				Your saved favourites (limit 10).
			</Typography>
			{error && (
				<Alert severity="warning" sx={{ mb: 1 }}>
					{error}
				</Alert>
			)}
			{loading ? (
				<Grid2 container spacing={2}>
					{Array.from({ length: 6 }).map((_, idx) => (
						<Grid2 key={idx} xs={6} md={4}>
							<Skeleton variant="rectangular" height={140} />
						</Grid2>
					))}
				</Grid2>
			) : favourites.length === 0 ? (
				<Typography>No favourites yet. Head to the gallery to add some.</Typography>
			) : (
				<Box sx={{ mt: 1 }}>
					<Grid2 container spacing={2}>
						{favourites.map((fav) => (
							<Grid2 key={fav.id} xs={6} md={4}>
								<Box
									sx={{
										borderRadius: 2,
										overflow: "hidden",
										boxShadow:
											"0 4px 14px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
									}}>
									<img
										src={fav?.image?.url}
										alt={`Favourite cat ${fav.image_id}`}
										style={{ width: "100%", display: "block" }}
									/>
								</Box>
							</Grid2>
						))}
					</Grid2>
				</Box>
			)}
		</section>
	);
}
