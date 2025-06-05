import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <Provider store={store}>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
      
    </Provider>
  );
}