import axios from "axios";

const targomoAPI = axios.create({
  baseURL: process.env.REACT_APP_TRAGOMO_API_URL,
  params: {
    key: process.env.REACT_APP_TRAGOMO_API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});
export default targomoAPI;
