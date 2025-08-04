import api from "./axios";

export const getAllCareer = () => api.get("/career");
export const getCareerById = (id) => api.get(`/career/${id}`);
export const createCareer = (data) => api.post("/career", data);
export const updateCareer = (id, data) => api.put(`/career/${id}`, data);