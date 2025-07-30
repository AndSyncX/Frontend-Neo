import api from "./axios";

export const getAllUsers = () => api.get("/user");
export const getAllTeachers = () => api.get("/user/teachers");
export const getUserById = (id) => api.get(`/user/${id}`);
export const createUser = (data) => api.post("/user", data);
export const updateUser = (id, data) => api.put(`/user/${id}`, data);
export const deleteUser = (id) => api.delete(`/user/${id}`);