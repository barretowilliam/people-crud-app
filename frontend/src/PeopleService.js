
import axios from "axios";

// Fallback: se não houver REACT_APP_API_URL, usa o path relativo (proxy CRA ou mesma origem em produção)
const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/$/, "") || "";
const RESOURCE = "/api/pessoas";
const API_URL = `${API_BASE}${RESOURCE}`;

export const getPeople     = () => axios.get(API_URL);
export const createPerson  = (person) => axios.post(API_URL, person);
export const updatePerson  = (id, person) => axios.put(`${API_URL}/${id}`, person);
export const deletePerson  = (id) => axios.delete(`${API_URL}/${id}`);
