import { ImageListItem } from "@mui/material";

export default function CurrentCat({ currCatImage }){
    if (!currCatImage) {
        return <div>No cat selected</div>;
    }
    
    return <ImageListItem className="current-cat card">
        <img id="current-cat" key={currCatImage.id} src={currCatImage.url} alt={currCatImage.breed ? `${currCatImage.breed} cat`:"A cute cat"}></img>
    </ImageListItem>
}

