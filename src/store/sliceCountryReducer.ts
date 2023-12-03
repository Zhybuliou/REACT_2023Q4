import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  country: [
    'USA',
    'Belarus',
    'Poland',
    'Norway',
    'Finland',
    'England',
  ] as string[],
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    addCountry: (state, action) => {
      const stateCountry = state;
      stateCountry.country = [...state.country, action.payload];
    },
  },
});

export const { addCountry } = countrySlice.actions;
export default countrySlice.reducer;
