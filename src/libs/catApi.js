import axios from "axios";

const catAPI = axios.create({
    baseURL: import.meta.env.VITE_CAT_API_URL,
    headers: {
        'x-api-key': import.meta.env.VITE_CAT_API_KEY
    }
})

export const getACatImage = () => {
    return catAPI.get("/images/search")
        .then(({ status, data }) => {
            return { status, data }
        })
}

export const getCatImages = (catsPerPage, page, order, breed) => {
    return catAPI.get(`/images/search`, {
        params: {
            limit: catsPerPage,
            page,
            order: order || "ASC",
            breed_ids: breed || undefined
        }
    })
        .then(({ status, data }) => {
            return { status, data }
        })
}

export const getBreedList = () => {
    return catAPI.get("/breeds")
        .then(({ data }) => {
            console.log(data)
            return data
        })
}
