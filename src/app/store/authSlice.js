import { createSlice } from '@reduxjs/toolkit';

const USER_ID_KEY = 'user_id'; // Define the key for storing user ID in sessionStorage

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem(USER_ID_KEY, action.payload.id); // Store user ID in sessionStorage
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem(USER_ID_KEY); // Remove user ID from sessionStorage on logout
    },
    restoreUser: (state, action) => {
      state.user = action.payload; // Restore user with the provided user ID
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, restoreUser } = authSlice.actions; // Export restoreUser action creator
export default authSlice.reducer;
