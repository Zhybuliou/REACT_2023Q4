import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputSearch: localStorage.getItem('search') || '',
};

const inputSearchSlice = createSlice({
  name: 'inputSearch',
  initialState,
  reducers: {
    addInputSearch: (state, action) => {
      const inputSearch = state;
      inputSearch.inputSearch = action.payload;
    },
  },
});

export const { addInputSearch } = inputSearchSlice.actions;
export default inputSearchSlice.reducer;
