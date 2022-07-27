import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { appApi } from './app-api';
import  cartSlice  from '../shared/store/slices/cart-slice';
export const store = configureStore({
  reducer: { [appApi.reducerPath]: appApi.reducer,cartSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

setupListeners(store.dispatch);
