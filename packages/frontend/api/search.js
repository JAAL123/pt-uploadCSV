import axios from "./axios.js";

export const searchRequest = async (query) => axios.get(`/users?q=${query}`);