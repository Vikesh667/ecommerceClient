import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBrands, fetchCategories, fetchProduct, fetchProductById, fetchProductsByFilters } from './productApi';

const initialState = {
  products: [],
  categories:[],
  brands:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
};

export const fetchProductAsync = createAsyncThunk(
  'prodcut/fetchProduct',
  async () => {
    const response = await fetchProduct();

    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'prodcut/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);

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
export const fetchCategoriesAsync = createAsyncThunk(
  'prodcut/fetchCategories',
  async () => {
    const response = await fetchCategories();

    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  'prodcut/fetchBrands',
  async () => {
    const response = await fetchBrands();

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
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
  },
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectTotalItems=(state)=> state.product.totalItems
export const selectedProductById=(state)=> state.product.selectedProduct

export default productSlice.reducer;
