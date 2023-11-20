import { createSlice } from '@reduxjs/toolkit';
import { IPeople } from '../types/interface';

const initialState = {
  characters: [] as IPeople[],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacters: (state, action) => {
      const stateCharacters = state;
      stateCharacters.characters = [...state.characters, ...action.payload];
    },
    removeCharacters: (state) => {
      const stateCharacters = state;
      stateCharacters.characters = [];
    },
  },
});

export const { addCharacters, removeCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
