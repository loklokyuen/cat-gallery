import { useCallback, useEffect, useMemo, useState } from "react";
import CatList from "../components/CatList";
import CurrentCat from "../components/CurrentCat";
import {
	addFavourite,
	deleteVote,
	getCatImages,
	getFavourites,
	getOrCreateSubId,
	getVotes,
	removeFavourite,
	voteForImage,
} from "../libs/catApi";
import { Alert, Box, Grid2, Skeleton } from "@mui/material";
import SortFilterBar from "../components/SortFilterBar";

export default function Gallery() {
	const [catImages, setCatImages] = useState([]);
	const [currCatImage, setCurrCatImage] = useState("");
	const [catsPerPage, setCatsPerPage] = useState(20);
	const [page, setPage] = useState(1);
	const [order, setOrder] = useState("ASC");
	const [breed, setBreed] = useState("");
	const [loading, setLoading] = useState(false);
	const [favourites, setFavourites] = useState([]);
	const [likes, setLikes] = useState([]);
	const [actionMessage, setActionMessage] = useState("");
	const [actionError, setActionError] = useState("");
	const favouriteLimit = 10;
	const [subId] = useState(() => getOrCreateSubId());

	useEffect(() => {
		setLoading(true);
		getCatImages(catsPerPage, page - 1, order, breed)
			.then((response) => {
				if (response.status === 200) {
					if (response.data && response.data.length > 0) {
						setCurrCatImage(response.data[0]);
						setCatImages(response.data);
					} else {
						setCatImages([]);
						setCurrCatImage(null);
					}
				} else if (response.status === 429) {
					console.warn("Rate limit exceeded");
				}
			})
			.catch((error) => {
				console.error("Error fetching cat images:", error);
				setCatImages([]);
				setCurrCatImage(null);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [catsPerPage, page, order, breed]);

	const refreshReactions = useCallback(() => {
		if (!subId) return;
		getFavourites(subId)
			.then((data) => setFavourites(data || []))
			.catch((err) => {
				console.error("Error fetching favourites", err);
				setActionError("Could not load favourites");
			});
		getVotes(subId)
			.then((data) =>
				setLikes((data || []).filter((vote) => Number(vote.value) === 1))
			)
			.catch((err) => {
				console.error("Error fetching votes", err);
				setActionError("Could not load likes");
			});
	}, [subId]);

	useEffect(() => {
		refreshReactions();
	}, [refreshReactions]);

	const isLiked = useCallback(
		(imageId) => likes.some((vote) => vote.image_id === imageId),
		[likes]
	);

	const isFavourite = useCallback(
		(imageId) => favourites.some((fav) => fav.image_id === imageId),
		[favourites]
	);

	const favouriteLimitReached = useMemo(() => {
		if (!currCatImage) return false;
		const alreadyFavourite = isFavourite(currCatImage.id);
		return favourites.length >= favouriteLimit && !alreadyFavourite;
	}, [currCatImage, favourites.length, favouriteLimit, isFavourite]);

	const handleToggleLike = async () => {
		if (!currCatImage) return;
		setActionError("");
		setActionMessage("");
		const existingVote = likes.find((vote) => vote.image_id === currCatImage.id);
		try {
			if (existingVote) {
				await deleteVote(existingVote.id);
				setLikes((prev) => prev.filter((vote) => vote.id !== existingVote.id));
				setActionMessage("Like removed");
			} else {
				await voteForImage(currCatImage.id, 1, subId);
				refreshReactions();
				setActionMessage("Cat liked!");
			}
		} catch (err) {
			console.error("Error toggling like", err);
			setActionError("Could not update like. Please try again.");
		}
	};

	const handleToggleFavourite = async () => {
		if (!currCatImage) return;
		setActionError("");
		setActionMessage("");
		const existingFavourite = favourites.find(
			(fav) => fav.image_id === currCatImage.id
		);
		try {
			if (existingFavourite) {
				await removeFavourite(existingFavourite.id);
				setFavourites((prev) =>
					prev.filter((fav) => fav.id !== existingFavourite.id)
				);
				setActionMessage("Removed from favourites");
			} else {
				if (favourites.length >= favouriteLimit) {
					setActionError("Favourites are limited to 10. Remove one to add more.");
					return;
				}
				await addFavourite(currCatImage.id, subId);
				refreshReactions();
				setActionMessage("Added to favourites");
			}
		} catch (err) {
			console.error("Error toggling favourite", err);
			setActionError("Could not update favourites. Please try again.");
		}
	};

	if (loading)
		return (
			<>
				<h2>Gallery</h2>
				{/* Skeleton for current cat image */}
				<Skeleton
					variant="rectangular"
					width="100%"
					height={300}
					animation="wave"
					sx={{ mb: 2, borderRadius: 1 }}
				/>

				{/* Skeleton for SortFilterBar */}
				<Skeleton
					variant="rectangular"
					width="100%"
					height={100}
					animation="wave"
					sx={{ mb: 2, borderRadius: 1 }}
				/>

				{/* Skeletons for CatList */}
				<Box sx={{ height: 450, overflowY: "scroll", marginBlock: 1 }}>
					<Grid2 container spacing={1}>
						{Array.from(new Array(9)).map((_, index) => (
							<Grid2 item xs={4} key={index}>
								<Skeleton
									variant="rectangular"
									width="100%"
									height={120}
									animation="wave"
									sx={{ borderRadius: 1, mb: 1 }}
								/>
							</Grid2>
						))}
					</Grid2>
				</Box>
			</>
		);
	return (
		<>
			<h2>Gallery</h2>
			{actionMessage && (
				<Alert severity="success" sx={{ mb: 1 }}>
					{actionMessage}
				</Alert>
			)}
			{actionError && (
				<Alert severity="warning" sx={{ mb: 1 }}>
					{actionError}
				</Alert>
			)}
			<CurrentCat
				currCatImage={currCatImage}
				onToggleLike={handleToggleLike}
				onToggleFavourite={handleToggleFavourite}
				isLiked={currCatImage ? isLiked(currCatImage.id) : false}
				isFavourite={currCatImage ? isFavourite(currCatImage.id) : false}
				favouriteLimitReached={favouriteLimitReached}
				favouriteLimit={favouriteLimit}
			/>
			<SortFilterBar
				catsPerPage={catsPerPage}
				order={order}
				breed={breed}
				setCatsPerPage={setCatsPerPage}
				setPage={setPage}
				setOrder={setOrder}
				setBreed={setBreed}></SortFilterBar>
			<CatList
				catImages={catImages}
				currCatImage={currCatImage}
				setCurrCatImage={setCurrCatImage}
				page={page}
				setPage={setPage}
				catsPerPage={catsPerPage}
				order={order}></CatList>
		</>
	);
}
