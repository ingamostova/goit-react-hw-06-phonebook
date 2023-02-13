import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';

import { filterSlice } from 'redux/filterSlice';
import { contactsSlice } from 'redux/contactsSlice';

const contactsReducer = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsReducer
);

export const store = configureStore({
  reducer: persistedContactsReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
