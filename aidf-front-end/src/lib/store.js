import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
// import userReducer from './features/userSlice';
import searchReducer from '../lib/features/searchSlice';

import { api } from "./api";

export const store = configureStore({
    reducer: {
        // userinfor: userReducer,
        [api.reducerPath]: api.reducer,
        search: searchReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)
