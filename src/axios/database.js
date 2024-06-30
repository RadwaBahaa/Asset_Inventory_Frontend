import axios from "axios";

const database = axios.create({
  baseURL: process.env.REACT_APP_DATABASE_URL || "http://localhost:5122/api",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

export const setAuthToken = async (token) => {
  try {
    if (token) {
      database.defaults.headers.common["Authorization"] = token;
      const response = await database.get("/account/validate-token");
      return response;
    } else {
      delete database.defaults.headers.common["Authorization"];
    }
  } catch (err) {
    console.log("Error setting token: ", err);
    throw err;
  }
};

export default database;
