import { useEffect, useState } from "react";
import { Alert, Box, Grid2, Skeleton, Stack, Typography } from "@mui/material";
import { getOrCreateSubId, getVotes } from "../libs/catApi";

export default function Activity() {
	const [likes, setLikes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const subId = getOrCreateSubId();
		if (!subId) {
			setError("Could not load your activity without a user id.");
			setLoading(false);
			return;
		}
		getVotes(subId)
			.then((data) => setLikes((data || []).filter((vote) => vote.value === 1)))
			.catch((err) => {
				console.error("Error fetching likes", err);
				setError("Unable to load likes right now.");
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<section>
			<h2>Activity</h2>
			<Typography variant="body1" sx={{ mb: 1 }}>
				Your recent likes appear here.
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
			) : likes.length === 0 ? (
				<Typography>No likes yet. Tap the like button in the gallery to start.</Typography>
			) : (
				<Grid2 container spacing={2}>
					{likes.map((vote) => {
						const createdAt = vote?.created_at
							? new Date(vote.created_at)
							: null;
						return (
							<Grid2 key={vote.id} xs={12} md={6}>
								<Box
									sx={{
										display: "flex",
										gap: 1,
										alignItems: "center",
										borderRadius: 2,
										p: 1,
										boxShadow:
											"0 4px 14px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
									}}>
									<Box
										sx={{
											width: 120,
											height: 120,
											overflow: "hidden",
											borderRadius: 2,
											flexShrink: 0,
										}}>
										<img
											src={vote?.image?.url}
											alt={`Liked cat ${vote.image_id}`}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
										/>
									</Box>
									<Stack spacing={0.5} alignItems="flex-start">
										<Typography variant="subtitle1">
											Cat {vote.image_id}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											{createdAt
												? `Liked on ${createdAt.toLocaleString()}`
												: "Liked recently"}
										</Typography>
									</Stack>
								</Box>
							</Grid2>
						);
					})}
				</Grid2>
			)}
		</section>
	);
}
