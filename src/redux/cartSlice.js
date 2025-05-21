// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// export const fetchProducts = createAsyncThunk(
//   "cart/fetchProducts",
//   async () => {
//     const res = await fetch("https://fakestoreapi.com/products?limit=5");
//     const data = await res.json();
//     return data;
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     cart: [],
//     isLoading: false,
//     isError: false,
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       state.cart.push(action.payload);
//     },
//     removeFromCart: (state, action) => {
//       state.cart = state.cart.filter((item) => item.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state) => {
//         state.isLoading = false;
//         state.isError = true;
//       });
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchProducts = createAsyncThunk('cart/fetchProducts', async () => {
  const res = await fetch('https://fakestoreapi.com/products?limit=5');
  return res.json();
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    cart: [],  
    status: 'idle',
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeOneFromCart: (state, action) => {
      const item = state.cart.find(i => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter(i => i.id !== action.payload);
        }
      }
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

export const { addToCart, removeOneFromCart } = cartSlice.actions;
export default cartSlice.reducer;