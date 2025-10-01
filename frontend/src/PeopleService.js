import axios from "axios";

const API_URL = "https://miniature-xylophone-9457vx69xp6fppvx-5002.app.github.dev/api/pessoas";

export const getPeople     = () => axios.get(API_URL);
export const createPerson  = (person) => axios.post(API_URL, person);
export const updatePerson  = (id, person) => axios.put(`${API_URL}/${id}`, person);
export const deletePerson  = (id) => axios.delete(`${API_URL}/${id}`);
