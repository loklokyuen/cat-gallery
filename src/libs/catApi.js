import axios from "axios";

const CAT_API_URL =
	import.meta.env.VITE_CAT_API_URL || "https://api.thecatapi.com/v1";
const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY || "DEMO-API-KEY";

const catAPI = axios.create({
	baseURL: CAT_API_URL,
	headers: CAT_API_KEY
		? {
				"x-api-key": CAT_API_KEY,
		  }
		: {},
});

const SUB_ID_KEY = "cat_gallery_sub_id";

export const getOrCreateSubId = () => {
	if (typeof localStorage === "undefined") return null;
	const existing = localStorage.getItem(SUB_ID_KEY);
	if (existing) return existing;
	const newId =
		crypto.randomUUID?.() ||
		`cat-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
	localStorage.setItem(SUB_ID_KEY, newId);
	return newId;
};

export const getACatImage = () => {
	return catAPI.get("/images/search").then(({ status, data }) => {
		return { status, data };
	});
};

export const getCatImages = (catsPerPage, page, order, breed) => {
	return catAPI
		.get(`/images/search`, {
			params: {
				limit: catsPerPage,
				page,
				order: order || "ASC",
				breed_ids: breed || undefined,
			},
		})
		.then(({ status, data }) => {
			return { status, data };
		});
};

export const getBreedList = () => {
	return catAPI.get("/breeds").then(({ data }) => {
		return data;
	});
};

export const getFavourites = (subId = getOrCreateSubId()) => {
	return catAPI
		.get("/favourites", {
			params: { sub_id: subId },
		})
		.then(({ data }) => data);
};

export const addFavourite = (imageId, subId = getOrCreateSubId()) => {
	return catAPI
		.post("/favourites", {
			image_id: imageId,
			sub_id: subId,
		})
		.then(({ data }) => data);
};

export const removeFavourite = (favouriteId) => {
	return catAPI.delete(`/favourites/${favouriteId}`).then(({ data }) => data);
};

export const getVotes = (subId = getOrCreateSubId()) => {
	return catAPI
		.get("/votes", {
			params: { sub_id: subId, order: "DESC" },
		})
		.then(({ data }) => data);
};

export const voteForImage = (imageId, value = 1, subId = getOrCreateSubId()) => {
	return catAPI
		.post("/votes", {
			image_id: imageId,
			value,
			sub_id: subId,
		})
		.then(({ data }) => data);
};

export const deleteVote = (voteId) => {
	return catAPI.delete(`/votes/${voteId}`).then(({ data }) => data);
};

if (!import.meta.env.VITE_CAT_API_KEY) {
	console.warn(
		"[Cat API] VITE_CAT_API_KEY missing. Using the public demo key which is rate limited. Add your own key in .env."
	);
}
