import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  items: [],
};

// Guardar en AsyncStorage
const saveToStorage = async (items) => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(items));
  } catch (error) {
    console.error('Error guardando el carrito:', error);
  }
};

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cargarCarritoDesdeAsyncStorage: (state, action) => {
      state.items = action.payload;
    },
    agregarAlCarrito: (state, action) => {
      const { item, cantidad } = action.payload;
      const existente = state.items.find(p => p.id === item.id);

      if (existente) {
        existente.cantidad += cantidad;
      } else {
        state.items.push({ ...item, cantidad });
      }

      saveToStorage(state.items);
    },
    vaciarCarrito: (state) => {
      state.items = [];
      saveToStorage([]);
    },
  },
});

// Thunk para iniciar el carrito
export const iniciarCarrito = () => async (dispatch) => {
  try {
    const data = await AsyncStorage.getItem('cart');
    if (data) {
      const parsed = JSON.parse(data);
      dispatch(cartSlice.actions.cargarCarritoDesdeAsyncStorage(parsed));
    }
  } catch (error) {
    console.error('Error cargando carrito desde AsyncStorage:', error);
  }
};

// Exportaciones
export const {
  agregarAlCarrito,
  vaciarCarrito,
  cargarCarritoDesdeAsyncStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
