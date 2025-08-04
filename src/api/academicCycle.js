import api from "./axios";

export const getAllCycles = () => api.get("/cycle");
export const getCycleById = (id) => api.get(`/cycle/${id}`);
export const createCycle = (data) => api.post("/cycle", data);
export const updateCycle = (id, data) => api.put(`/cycle/${id}`, data);