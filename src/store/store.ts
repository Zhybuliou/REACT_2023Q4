import { configureStore } from '@reduxjs/toolkit';
import pagesReducer from './slicePagesReducer';
import perPageReducer from './slicePrePageReducer';
import inputSearchReducer from './sliceSearchReducer';
import apiResult from './createApiResult';
import charactersSlice from './sliceCharactersReducer';

export const store = configureStore({
  reducer: {
    inputSearch: inputSearchReducer,
    [apiResult.reducerPath]: apiResult.reducer,
    characters: charactersSlice,
    pages: pagesReducer,
    perPage: perPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiResult.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
