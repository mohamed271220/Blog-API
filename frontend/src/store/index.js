import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import authReducer from '../features/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: persistedReducer,
  },
});
const persistor = persistStore(store);

export { store, persistor };
