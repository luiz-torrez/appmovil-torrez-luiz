import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const cargarCarrito = async () => {
      const data = await AsyncStorage.getItem('carrito');
      if (data) setCarrito(JSON.parse(data));
    };
    cargarCarrito();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (item, cantidad) => {
    const itemAgregado = { ...item, cantidad };
    const nuevoCarrito = [...carrito];
    const existente = nuevoCarrito.find(p => p.id === itemAgregado.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      nuevoCarrito.push(itemAgregado);
    }

    setCarrito(nuevoCarrito);
    ToastAndroid.show('Producto agregado', ToastAndroid.SHORT);
  };

  const cantidadEnCarrito = () =>
    carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

  const precioTotal = () =>
    carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        cantidadEnCarrito,
        precioTotal,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};