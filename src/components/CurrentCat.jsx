import { Button, ImageListItem, Stack, Tooltip, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function CurrentCat({
	currCatImage,
	onToggleLike,
	onToggleFavourite,
	isLiked,
	isFavourite,
	favouriteLimitReached,
	favouriteLimit,
	onSetAsAvatar,
}) {
	if (!currCatImage) {
		return <div>No cat selected. Pick one below to like or favourite.</div>;
	}

	const inactiveStyle = {
		borderWidth: 2,
		backgroundColor: "#fff",
		"&:hover": { backgroundColor: "primary.light", color: "#fff", borderWidth: 2 },
	};

	return (
		<ImageListItem className="current-cat card" sx={{ mb: 1 }}>
			<img
				id="current-cat"
				key={currCatImage.id}
				src={currCatImage.url}
				alt={currCatImage.breed ? `${currCatImage.breed} cat` : "A cute cat"}
			/>
			<Stack
				direction="row"
				spacing={1}
				justifyContent="center"
				alignItems="center"
				sx={{ mt: 1, flexWrap: "wrap" }}>
				<Button
					variant={isLiked ? "contained" : "outlined"}
					startIcon={isLiked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
					onClick={onToggleLike}
					sx={isLiked ? {} : inactiveStyle}>
					{isLiked ? "Unlike" : "Like"}
				</Button>
				<Button
					variant={isFavourite ? "contained" : "outlined"}
					color={favouriteLimitReached && !isFavourite ? "secondary" : "primary"}
					startIcon={isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
					onClick={onToggleFavourite}
					disabled={favouriteLimitReached && !isFavourite}
					sx={isFavourite ? {} : inactiveStyle}>
					{isFavourite ? "Remove Favourite" : "Add Favourite"}
				</Button>
				{onSetAsAvatar && (
					<Tooltip title="Set this cat as your profile picture">
						<Button
							variant="outlined"
							startIcon={<AccountCircleIcon />}
							onClick={onSetAsAvatar}
							sx={inactiveStyle}>
							Set as Avatar
						</Button>
					</Tooltip>
				)}
			</Stack>
			{favouriteLimitReached && !isFavourite && (
				<Typography variant="caption" color="text.secondary">
					Favourites are limited to {favouriteLimit}. Remove one to add more.
				</Typography>
			)}
		</ImageListItem>
	);
}
