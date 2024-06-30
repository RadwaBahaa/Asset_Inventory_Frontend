import axios from "axios";

const database = axios.create({
  baseURL: process.env.REACT_APP_DATABASE_URL || "http://localhost:5122/api",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    database.defaults.headers.common["Authorization"] = token;
  } else {
    delete database.defaults.headers.common["Authorization"];
  }
};

export default database;
