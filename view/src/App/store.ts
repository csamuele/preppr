import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './apiSlice';
import { authReducer } from 'Features/user';
import { uiReducer } from 'Features/ui';
import { restaurantReducer } from 'Features/restaurants';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        restaurant: restaurantReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;