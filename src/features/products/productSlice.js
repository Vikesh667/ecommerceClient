import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProduct, fetchProductsByFilters } from './productApi';

const initialState = {
  products: [],
  status: 'idle',
  totalItems:0
};

export const fetchProductAsync = createAsyncThunk(
  'prodcut/fetchProduct',
  async () => {
    const response = await fetchProduct();

    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'prodcut/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);

    return response.data;
  }
);
export const productSlice = createSlice({
  name: 'product',
  initialState,
 
  reducers: {
    increment: (state) => {

      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems=action.payload.totalItems
      });
  },
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems=(state)=> state.product.totalItems


export default productSlice.reducer;
