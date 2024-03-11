// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Adjust the import path based on your actual path

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other slices if you have them
});

export default rootReducer;
