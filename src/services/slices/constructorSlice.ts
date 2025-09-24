import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from 'nanoid';

export type TConstructorType = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorType = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state,
        action: PayloadAction<TConstructorIngredient & { uid: string }>
      ) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          uid: nanoid()
        }
      })
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uid !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredientUp: (state, action) => {
      const index = action.payload;

      if (index > 0 && index < state.ingredients.length) {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      }
    },
    moveIngredientDown: (state, action) => {
      const index = action.payload;

      if (index >= 0 && index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    }
  },
  selectors: {
    getConstructorItems: (state) => state
  }
});

export const {
  addIngredient,
  deleteIngredient,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;

export const { getConstructorItems } = constructorSlice.selectors;

export default constructorSlice;
