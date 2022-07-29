import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { appApi } from './app-api';
import  cartSlice  from '../shared/store/slices/cart-slice';
import currencySlice from '../shared/store/slices/currency-slice';
export const store = configureStore({
  reducer: { [appApi.reducerPath]: appApi.reducer,cartSlice,currencySlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

setupListeners(store.dispatch);
