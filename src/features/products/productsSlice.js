import { createSlice } from '@reduxjs/toolkit';
import { getItems, getGenres } from '../../firebase/config';

const initialState = {
  items: [],
  genres: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setItems, setGenres, setLoading, setError } = productsSlice.actions;

export const fetchItems = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const items = await getItems();
    dispatch(setItems(items));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchGenres = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const genres = await getGenres();
    dispatch(setGenres(genres));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default productsSlice.reducer;