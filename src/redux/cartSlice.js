import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchProducts = createAsyncThunk('cart/fetchProducts', async () => {
  const res = await fetch('https://fakestoreapi.com/products?limit=5');
  const data = await res.json();
  return data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    cart: [],
  
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;