import axios from "axios";

export const BASE_URL = "http://localhost:8080"

export const getGames = async () => {
  try {
    return await axios.get(`${BASE_URL}/games`);
  } catch (e) {
    return [];
  }
};