import { useEffect, useState } from "react";
import CatList from "./CatList";
import CurrentCat from "./CurrentCat";
import { getCatImages } from "../api";
import { Box, Grid2, Skeleton } from "@mui/material";
import SortFilterBar from "./SortFilterBar";

export default function Gallery() {
	const [catImages, setCatImages] = useState([]);
	const [currCatImage, setCurrCatImage] = useState("");
	const [catsPerPage, setCatsPerPage] = useState(20);
	const [page, setPage] = useState(1);
	const [order, setOrder] = useState(null);
	const [breed, setBreed] = useState(null);
	const [loading, setLoading] = useState(false);

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
					console.warn('Rate limit exceeded');
				}
			})
			.catch((error) => {
				console.error('Error fetching cat images:', error);
				setCatImages([]);
				setCurrCatImage(null);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [catsPerPage, page, order, breed]);
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
			<CurrentCat currCatImage={currCatImage}></CurrentCat>
			<SortFilterBar
				setCatsPerPage={setCatsPerPage}
				setPage={setPage}
				setOrder={setOrder}
				setBreed={setBreed}></SortFilterBar>
			<CatList
				catImages={catImages}
				currCatImage={currCatImage}
				setCurrCatImage={setCurrCatImage}
				page={page}
				setPage={setPage}></CatList>
		</>
	);
}
