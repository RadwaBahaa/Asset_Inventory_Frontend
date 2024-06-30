import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import database, { setAuthToken } from "../../axios/database";

export const validateToken = createAsyncThunk(
  "login/validate-token",
  async (token, { rejectWithValue }) => {
    try {
      const response = await setAuthToken(token);
      return response.data; // Assume your API returns user data on successful validation
    } catch (error) {
      if (!error.response) {
        // Network or connection error
        return rejectWithValue("Network error: Cannot connect to API");
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "login/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await database.post("/account/login", credentials);
      const token = response.data.token;
      return { token, ...response.data };
    } catch (error) {
      if (!error.response) {
        // Network or connection error
        return rejectWithValue("Network error: Cannot connect to API");
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "", // JWT token
    role: "", // User role
    id: 0, // User ID
    error: null, // Error message if login fails
  },
  reducers: {
    setLogout: (state) => {
      state.token = "";
      state.role = "";
      state.id = 0;
    },
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.id = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.id = action.payload.id;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.id = action.payload.id;
        state.error = null;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setLogout, setLogin } = loginSlice.actions;
export default loginSlice.reducer;
