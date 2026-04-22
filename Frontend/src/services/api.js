import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

export const getTasks = (token) =>
  API.get("/tasks", { headers: { Authorization: token } });

export const createTask = (data, token) =>
  API.post("/tasks", data, { headers: { Authorization: token } });

export const deleteTask = (id, token) =>
  API.delete(`/tasks/${id}`, {
    headers: { Authorization: token }
  });