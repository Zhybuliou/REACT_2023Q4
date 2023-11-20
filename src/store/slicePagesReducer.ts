import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pages: '1',
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    addPage: (state, action) => {
      const pages = state;
      pages.pages = action.payload;
    },
  },
});

export const { addPage } = pagesSlice.actions;
export default pagesSlice.reducer;
