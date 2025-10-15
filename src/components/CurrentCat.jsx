import { Button, ImageListItem, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export default function CurrentCat({
	currCatImage,
	onToggleLike,
	onToggleFavourite,
	isLiked,
	isFavourite,
	favouriteLimitReached,
	favouriteLimit,
}) {
	if (!currCatImage) {
		return <div>No cat selected. Pick one below to like or favourite.</div>;
	}

	return (
		<ImageListItem className="current-cat card" sx={{ mb: 1 }}>
			<img
				id="current-cat"
				key={currCatImage.id}
				src={currCatImage.url}
				alt={
					currCatImage.breed ? `${currCatImage.breed} cat` : "A cute cat"
				}></img>
			<Stack
				direction="row"
				spacing={1}
				justifyContent="center"
				alignItems="center"
				sx={{ mt: 1, flexWrap: "wrap" }}>
				<Button
					variant={isLiked ? "contained" : "outlined"}
					startIcon={isLiked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
					onClick={onToggleLike}>
					{isLiked ? "Unlike" : "Like"}
				</Button>
				<Button
					variant={isFavourite ? "contained" : "outlined"}
					color={favouriteLimitReached && !isFavourite ? "secondary" : "primary"}
					startIcon={isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
					onClick={onToggleFavourite}
					disabled={favouriteLimitReached && !isFavourite}>
					{isFavourite ? "Remove Favourite" : "Add Favourite"}
				</Button>
			</Stack>
			{favouriteLimitReached && !isFavourite && (
				<Typography variant="caption" color="text.secondary">
					Favourites are limited to {favouriteLimit}. Remove one to add more.
				</Typography>
			)}
		</ImageListItem>
	);
}
