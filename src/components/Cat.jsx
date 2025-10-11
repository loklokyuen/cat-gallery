import { ImageListItem } from "@mui/material";

export default function Cat({ catImage, currCatImage, setCurrCatImage }) {
	return (
		<ImageListItem
			key={catImage.id}
			sx={{
				cursor: "pointer",
				position: "relative",
				overflow: "visible",
				"& img": {
					display: "block",
					width: "100%",
					borderRadius: "10px",
					transition: "transform 0.3s ease, box-shadow 0.3s ease",
					transformOrigin: "center",
				},
				"&:hover": { zIndex: 2 },
				"&:hover img": {
					transform: "scale(1.08)",
					boxShadow:
						"0 8px 30px rgba(0, 0, 0, 0.28), 0 6px 12px rgba(0, 0, 0, 0.15)",
				},
			}}>
			<img
				className={`cat-image  ${
					currCatImage.id === catImage.id ? "selected-cat" : null
				}`}
				onClick={() => {
					setCurrCatImage(catImage);
				}}
				loading="lazy"
				src={catImage.url}
				alt={
					catImage.breed
						? catImage.breed + " "
						: "" + `cat with id ${catImage.id}`
				}></img>
		</ImageListItem>
	);
}
