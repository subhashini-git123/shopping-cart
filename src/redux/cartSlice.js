import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return res.json();
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cart: [],
    status: "idle",
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeOneFromCart: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter((i) => i.id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addToCart, removeOneFromCart } = cartSlice.actions;
export default cartSlice.reducer;
