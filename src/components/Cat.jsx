import { ImageListItem } from "@mui/material"

export default function Cat({catImage, currCatImage, setCurrCatImage}){
    return <ImageListItem key={catImage.id} >
    <img className={`cat-image  ${ currCatImage.id === catImage.id ? "selected-cat": null }`} onClick={()=>{setCurrCatImage(catImage)}} loading="lazy"
    src={catImage.url} alt={catImage.breed ? catImage.breed + " ":"" + `cat with id ${catImage.id}`}></img>
</ImageListItem>
}