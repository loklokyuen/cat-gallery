import { Box, Button, ImageList } from "@mui/material";
import Cat from "./Cat";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function CatList({
	catImages,
	currCatImage,
	setCurrCatImage,
	page,
	setPage,
	catsPerPage,
	order,
}) {
	if (!catImages || catImages.length === 0) {
		return (
			<Box sx={{ height: 450, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<p>No cats found :(</p>
			</Box>
		);
	}

	const hasNextPage = order === "RAND" ? false : !!catsPerPage && catImages.length === catsPerPage;
	const hasPrevPage = page > 1;

	return (
		<Box
			sx={{
				height: 450,
				overflowY: "auto",
				overflowX: "visible",
				marginBlock: 1,
				paddingInline: 0.5,
			}}>
			<ImageList cols={3} variant="masonry" gap={8} sx={{ overflow: "visible" }}>
				{catImages.map((catImage) => (
					<Cat
						key={catImage.id}
						catImage={catImage}
						currCatImage={currCatImage}
						setCurrCatImage={setCurrCatImage}></Cat>
				))}
			</ImageList>

			<Box sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 1.5 }}>
				<Button
					variant="outlined"
					startIcon={<ArrowBackIosNewIcon />}
					disabled={!hasPrevPage}
					sx={{
						minWidth: 130,
						borderWidth: "2px",
						backgroundColor: !hasPrevPage ? "#fff" : "#e89483",
						color: !hasPrevPage ? "#888888" : "#fff",
						"&:hover": {
							borderColor: "currentColor",
							backgroundColor: "#e89483",
							color: "#fff",
						},
					}}
					onClick={() => setPage(Math.max(1, page - 1))}>
					Previous Page
				</Button>

				<Button
					variant="outlined"
					endIcon={<ArrowForwardIosIcon />}
					disabled={!hasNextPage}
					sx={{
						minWidth: 130,
						borderWidth: "2px",
						backgroundColor: !hasNextPage ? "#fff" : "#e89483",
						color: !hasNextPage ? "#888888" : "#fff",
						"&:hover": {
							borderColor: "currentColor",
							backgroundColor: "#e89483",
							color: "#fff",
						},
					}}
					onClick={() => {
						setPage(page + 1);
					}}>
					Next Page
				</Button>
			</Box>
		</Box>
	);
}
