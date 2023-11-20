import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  perPage: '10',
};

const perPageSlice = createSlice({
  name: 'perPage',
  initialState,
  reducers: {
    addPerPage: (state, action) => {
      const perPage = state;
      perPage.perPage = action.payload;
    },
  },
});

export const { addPerPage } = perPageSlice.actions;
export default perPageSlice.reducer;
