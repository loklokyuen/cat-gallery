import { useEffect, useState } from "react";
import CatList from "./CatList";
import CurrentCat from "./CurrentCat";
import { getCatImages } from "../api";
import { CircularProgress } from "@mui/material";

export default function Gallery(){
    const [catImages, setCatImages] = useState([]);
    const [currCatImage, setCurrCatImage] = useState('');
    const [catsPerPage, setCatsPerPage] = useState(20);
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState(null);
    const [breed, setBreed] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        getCatImages(catsPerPage, page-1, order, breed)
        .then(({ status, data})=>{
            if ( status === 200){
                setCurrCatImage(data[0])
                setCatImages(data)
                setLoading(false)
                if (data.length === 0)
                    return <p>No cat found :/</p>
            } else if (status === 429){
                return <p>Slow down, human! Even cats need a breather.</p>
            }
        })
    }, [])
    if (loading) return <CircularProgress color="primary" sx={{ margin: 10 }} />
    return <>
        <h2>Gallery</h2>
        <CurrentCat currCatImage={currCatImage}></CurrentCat>
        
        <CatList catImages={catImages} currCatImage={currCatImage} setCurrCatImage={setCurrCatImage}></CatList>
    </>
}
