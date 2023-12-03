import { createSlice } from '@reduxjs/toolkit';
import { IFormResult } from '../types/interface';

const initialState = {
  formValues: [] as IFormResult[],
};

const formValuesSlice = createSlice({
  name: 'formValues',
  initialState,
  reducers: {
    addFormValues: (state, action) => {
      state.formValues.push(action.payload);
    },
  },
});

export const { addFormValues } = formValuesSlice.actions;
export default formValuesSlice.reducer;
