import axios from "./axios.js";

export const uploadRequest = async (file) => axios.post("/files", file);
