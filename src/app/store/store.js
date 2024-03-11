import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Adjust the import path based on your actual path

const store = configureStore({
  reducer: rootReducer,
});

export default store;