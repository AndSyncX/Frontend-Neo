import api from "./axios";

export const getAllCourses = () => api.get("/course");
export const getCourseById = (id) => api.get(`/course/${id}`);
export const createCourse = (data) => api.post("/course", data);
export const updateCourse = (id, data) => api.put(`/course/${id}`, data);