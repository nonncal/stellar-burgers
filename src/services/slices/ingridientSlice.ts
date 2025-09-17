import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '@api';

type ingredientsType = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ingredientsType = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  // TODO: async thunk проверить как работает? может без асинк
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload!;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.isLoading,
    getIngredientsError: (state) => state.error
  }
});

export const { getIngredients, getIngredientsLoading, getIngredientsError } =
  ingredientsSlice.selectors;
export default ingredientsSlice;
