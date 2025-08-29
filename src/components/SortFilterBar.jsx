import {
	Autocomplete,
	Button,
	Grid2,
	IconButton,
	MenuItem,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { getBreedList } from "../libs/catApi";
import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

export default function SortFilterBar({
	catsPerPage,
	order,
	breed,
	setCatsPerPage,
	setPage,
	setOrder,
	setBreed,
}) {
	const [breedList, setBreedList] = useState([]);
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		getBreedList()
			.then((data) => {
				const formattedBreedList = data.map((breed) => {
					return { label: breed.name, id: breed.id };
				});
				setBreedList(formattedBreedList);
			})
			.catch((error) => {
				console.error("Error fetching breed list:", error);
			});
	}, []);
	if (hidden)
		return (
			<Paper
				elevation={1}
				sx={{
					padding: "10px",
					marginBlock: "10px",
					borderRadius: "10px",
					display: "flex",
					justifyContent: "center",
					backgroundColor: "rgba(255, 255, 255, .8)",
					cursor: "pointer",
					transition: "background-color 0.3s",
					"&:hover": {
						backgroundColor: "rgba(255, 255, 255, .9)",
					},
				}}
				onClick={() => setHidden(false)}>
				<Stack direction="row" spacing={1} alignItems="center">
					<FilterListIcon color="primary" />
					<Typography color="primary">Show filter options</Typography>
				</Stack>
			</Paper>
		);
	return (
		<Paper
			elevation={2}
			sx={{
				justifyContent: "space-around",
				alignItems: "space-between",
				backgroundColor: "rgba(255, 255, 255, .8)",
				padding: "0",
				marginBlock: "10px",
				borderRadius: "10px",
				position: "relative",
			}}>
			<IconButton
				aria-label="Hide filters"
				size="small"
				onClick={() => setHidden(true)}
				sx={{ position: "absolute", top: 8, right: 8 }}>
				<CloseIcon fontSize="small" />
			</IconButton>
			<Grid2
				container
				spacing={3}
				sx={{
					justifyContent: "space-around",
					alignItems: "space-between",
					backgroundColor: "rgba(255, 255, 255, .8)",
					padding: "10px",
					marginBlock: "10px",
					borderRadius: "10px",
				}}>
				<Stack
					spacing={2}
					flexWrap={true}
					direction={{ xs: "column", sm: "row" }}
					alignItems={"center"}>
					<Stack direction={"row"} spacing={2}>
						<Autocomplete
							value={breed}
							options={breedList}
							sx={{ width: 180 }}
							onChange={(e, newBreed) => {
								setBreed(newBreed ? newBreed.id : "");
								setPage(1);
							}}
							renderInput={(params) => <TextField {...params} label="Breed" />}
						/>
						<Button
							variant="outlined"
							sx={{
								width: "40px",
								borderWidth: "2px",
								"&:hover": {
									borderColor: "currentColor",
									backgroundColor: "#e89483",
									color: "#fff",
								},
							}}
							onClick={() => {
								setBreed("");
								setPage(1);
							}}>
							Clear
						</Button>
					</Stack>

					<Stack direction={"row"} spacing={2}>
						<TextField
							select
							sx={{ width: "110px", paddingRight: "10px" }}
							label="cats per page"
							defaultValue="20"
							value={catsPerPage}
							onChange={(e) => {
								setCatsPerPage(e.target.value);
								setPage(1);
							}}>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={40}>40</MenuItem>
						</TextField>

						<TextField
							id="order"
							select
							label="Order"
							defaultValue="RAND"
							value={order}
							onChange={(e) => {
								setOrder(e.target.value);
							}}>
							<MenuItem value={"ASC"}>ascending</MenuItem>
							<MenuItem value={"DESC"}>descending</MenuItem>
							<MenuItem value={"RAND"}>random</MenuItem>
						</TextField>
					</Stack>
				</Stack>
			</Grid2>
		</Paper>
	);
}
