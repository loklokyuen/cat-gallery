import { Box, Button, ImageList } from "@mui/material";
import Cat from "./Cat";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function CatList({
	catImages,
	currCatImage,
	setCurrCatImage,
	page,
	setPage,
}) {
	if (!catImages || catImages.length === 0) {
		return (
			<Box sx={{ height: 450, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<p>No cats found :(</p>
			</Box>
		);
	}

	return (
		<Box sx={{ height: 450, overflowY: "scroll", marginBlock: 1 }}>
			<ImageList cols={3} variant="masonry" gap={8}>
				{catImages.map((catImage) => (
					<Cat
						key={catImage.id}
						catImage={catImage}
						currCatImage={currCatImage}
						setCurrCatImage={setCurrCatImage}></Cat>
				))}
			</ImageList>

			<Button
				variant="outlined"
				endIcon={<ArrowForwardIosIcon />}
				sx={{
					width: "140px",
					borderWidth: "2px",
					backgroundColor: "#e89483",
					color: "#fff",
					"&:hover": {
						borderColor: "currentColor",
						backgroundColor: "#e89483",
						color: "#fff",
					},
					"&:disabled": { backgroundColor: "#fff", color: "#888888" },
				}}
				onClick={() => {
					setPage(page + 1);
				}}>
				Next Page
			</Button>
		</Box>
	);
}
