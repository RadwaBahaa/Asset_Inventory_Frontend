import axios from "axios";

const geoapifyAPI = axios.create({
  baseURL: process.env.REACT_APP_GEOAPIFY_API_URL,
  params: {
    apiKey: process.env.REACT_APP_GEOAPIFY_API_KEY,
  },
});
export default geoapifyAPI;
