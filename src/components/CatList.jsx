import { Box, ImageList } from "@mui/material";
import Cat from "./Cat";

export default function CatList({ catImages, currCatImage, setCurrCatImage}){
    return <Box sx={{ height: 450, overflowY: 'scroll' }}>
        <ImageList cols={3} variant="masonry" gap={8}>
        { catImages.map((catImage)=>
            <Cat key={catImage.id} catImage={catImage} currCatImage={currCatImage} setCurrCatImage={setCurrCatImage}></Cat>)}
        </ImageList>
    </Box>
}