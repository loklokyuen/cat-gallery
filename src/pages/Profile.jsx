import { useEffect, useRef, useState } from "react";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Divider,
	Grid2,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { getFavourites, getOrCreateSubId } from "../libs/catApi";
import { logOut } from "../libs/auth";

export default function Profile({ user, setUser, avatarURL, setAvatarURL }) {
	const [favourites, setFavourites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [avatarError, setAvatarError] = useState("");
	const fileInputRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const subId = getOrCreateSubId();
		if (!subId) {
			setError("Could not resolve user id for favourites.");
			setLoading(false);
			return;
		}
		getFavourites(subId)
			.then((data) => setFavourites(data || []))
			.catch((err) => {
				console.error("Error fetching favourites", err);
				setError("Unable to load favourites right now.");
			})
			.finally(() => setLoading(false));
	}, []);

	const handleAvatarUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			setAvatarError("Please select an image file.");
			return;
		}
		setAvatarError("");
		const reader = new FileReader();
		reader.onload = (ev) => {
			const dataUrl = ev.target.result;
			localStorage.setItem("avatar", dataUrl);
			setAvatarURL(dataUrl);
		};
		reader.readAsDataURL(file);
	};

	const handleLogout = async () => {
		try {
			await logOut();
		} catch {
			// guest session has no Firebase session to sign out
		}
		localStorage.clear();
		setUser("");
		setAvatarURL("");
		navigate("/");
	};

	const displayName = user && user !== "guest" ? user : user === "guest" ? "Guest" : null;

	return (
		<section>
			<h2>Profile</h2>

			<Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
				<Avatar
					src={avatarURL || undefined}
					alt={displayName || "avatar"}
					sx={{ width: 72, height: 72, fontSize: 32 }}>
					{!avatarURL && displayName ? displayName[0].toUpperCase() : null}
				</Avatar>
				<Box>
					{displayName && (
						<Typography variant="h6">{displayName}</Typography>
					)}
					<Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
						<Button
							size="small"
							variant="outlined"
							onClick={() => fileInputRef.current?.click()}>
							Change photo
						</Button>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							hidden
							onChange={handleAvatarUpload}
						/>
						{user && (
							<Button
								size="small"
								variant="outlined"
								color="error"
								onClick={handleLogout}>
								Logout
							</Button>
						)}
					</Stack>
					{avatarError && (
						<Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
							{avatarError}
						</Typography>
					)}
				</Box>
			</Stack>

			<Divider sx={{ mb: 2 }} />

			<Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
				Favourites ({favourites.length}/10)
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
