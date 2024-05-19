import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { apiSlice } from '@redux/Reducers/apiSlice';
import sessionReducer from '@redux/Reducers/sessionSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, sessionReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  }).concat(apiSlice.middleware),
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    session: persistedReducer,
  },
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
