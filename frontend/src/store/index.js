import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
