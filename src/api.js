import axios from "axios";

const catAPI = axios.create({
    baseURL: import.meta.env.VITE_CAT_API_URL,
    headers: {
        'x-api-key': import.meta.env.VITE_CAT_API_KEY
    }
})

export const getACatImage = ()=>{
    return catAPI.get("/images")
    .then(({ data })=>{
        return data
    })
}

export const getCatImages = (catsPerPage, page, order, breed)=>{
    return catAPI.get(`/images/search`, { 
        params: { 
            limit: catsPerPage,
            page,
            order,
            breed_ids: breed
        } })
    .then(({ status, data })=>{
        return {status, data}
    })
}