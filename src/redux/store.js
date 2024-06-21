//new store.js
import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
// Configure and export the Redux store
export default configureStore({
  reducer: {
    articles: articlesReducer,
  },
});
