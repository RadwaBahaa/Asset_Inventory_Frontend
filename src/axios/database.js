import axios from "axios";

const database = axios.create({
  baseURL: process.env.REACT_APP_DATABASE_URL || "http://localhost:5122/api",
  headers: {
    Accept: "*/*",
  },
});

export default database;
