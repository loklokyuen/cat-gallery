import { ImageListItem } from "@mui/material";

export default function CurrentCat({ currCatImage }){
    return <ImageListItem>
        <img id="current-cat" key={currCatImage.id} src={currCatImage.url} alt={currCatImage.breed ? `${currCatImage.breed} cat`:"A cute cat"}></img>
    </ImageListItem>
}

