import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import authSlice from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
    products: productsReducer,
    cart: cartReducer, // Agregás cart acá correctamente
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});