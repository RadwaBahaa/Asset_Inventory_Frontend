# Asset and Resource Inventory Management System

This project is a front-end application built with **React JS** and enhanced using various **CSS frameworks**. The system is designed to streamline the management of assets and resources as they move from suppliers to warehouses and eventually to stores. By adopting this modern and location-based inventory solution, businesses can enhance their workflow efficiency and improve data accuracy.

## 🚀 Project Goals

1. **Improve Data Accuracy**: Automate asset tracking and updates to reduce human errors and ensure that inventory data is always up-to-date.
2. **Adopt Modern Workflow**: Implement a seamless workflow for asset management that integrates real-time updates and user-friendly interfaces.
3. **Gain Location Insights**: Utilize location-based features to monitor asset distribution and optimize resource allocation.
4. **Real-Time Monitoring**: Stay informed with up-to-the-minute data on asset status, movement, and location.

## 📝 Key Features

- **Asset Tracking**: Efficiently manage and track the movement of assets from suppliers to warehouses and finally to stores.
- **Resource Inventory Management**: Monitor and control resource levels across multiple locations, ensuring efficient operations.
- **Location Insights**: Leverage geographic analysis to gain insights into distribution and optimize logistics.
- **Real-Time Updates**: The system supports real-time data synchronization, providing instant feedback on inventory status and location changes.
- **SWOT Analysis Integration**: An integrated analysis tool that provides insights into the strengths, weaknesses, opportunities, and threats (SWOT) of the inventory system.
  - **Strengths (S)**: Adaptable and easily configurable to different business models.
  - **Weaknesses (W)**: Reliance on open-source tools may pose limitations.
  - **Opportunities (O)**: One of the few platforms offering comprehensive features for asset and resource management.
  - **Threats (T)**: Open-source nature exposes the system to potential vulnerabilities.

## 🛠️ Technologies Used

- **React JS**: For building the user interface and managing the application state.
- **Redux (with Redux Toolkit)**: For handling state management, including login and token validation.
- **CSS Frameworks**: Styled components and responsive designs for a seamless user experience.

## ⚙️ Redux for Authentication

The project uses Redux to manage authentication flows, including:

### 1. **Login Process**

The login functionality is managed using the `createAsyncThunk` method from Redux Toolkit. When a user submits their credentials, the application sends a login request using Axios to the backend API. Upon a successful login:

- The JWT token is stored in either `localStorage` or `sessionStorage`, based on whether the user chooses to stay signed in.
- User data, including the token, username, role, and ID, are saved in the Redux store.
- The application then redirects the user to the home page.

### 2. **Token Validation**

The application also includes token validation logic to check if a stored token is still valid:

- On every page load, the `TokenValidation` component dispatches a `validateToken` action that checks the validity of the stored token.
- If the token is valid, the user is redirected to the home page.
- If the token is invalid or expired, the user is logged out, and the application redirects them to the login page.

### 3. **State Management**

The Redux slice handles login state and includes:

- **Reducers** to set the login and logout state.
- **ExtraReducers** for handling asynchronous actions like login and token validation.

The login state includes the following properties:

- `token`: The JWT token.
- `userName`: The logged-in user’s name.
- `role`: The user’s role (e.g., admin, user).
- `id`: The user’s unique ID.
- `error`: Any error messages during the login process.

### Code Example:

Here’s a glimpse of the Redux slice managing login and validation:

```javascript
export const validateToken = createAsyncThunk(
  "login/validate-token",
  async (token, { rejectWithValue }) => {
    try {
      const response = await setAuthToken(token);
      return response.data; // Assume your API returns user data on successful validation
    } catch (error) {
      if (!error.response) {
        return rejectWithValue("Network error: Cannot connect to API");
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    userName: "",
    role: "",
    id: 0,
    error: null,
  },
  reducers: {
    setLogout: (state) => {
      state.token = "";
      state.userName = "";
      state.role = "";
      state.id = 0;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userName = action.payload.userName;
        state.role = action.payload.role;
        state.id = action.payload.id;
        state.error = null;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
```

## 📈 GIS and Location Analysis

- The system integrates **GIS (Geographic Information System)** analysis to offer detailed insights into the spatial distribution of assets.
- Users can visualize asset locations, analyze service areas, and optimize delivery routes based on geographic data.

## 💡 Why This Project?

The Asset and Resource Inventory Management System fills a critical gap by offering a versatile, location-aware solution that rivals few other platforms. It is adaptable to different scales of operation and can be customized to meet the unique needs of businesses.

## 📊 SWOT Analysis Recap

- **Strengths**: Adaptable, GIS-enabled, modern workflow.
- **Weaknesses**: Open-source dependencies, potential lack of full control.
- **Opportunities**: Unique in offering both asset management and real-time location insights.
- **Threats**: Open-source nature could lead to security risks.
