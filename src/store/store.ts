import { configureStore } from '@reduxjs/toolkit';
import pagesReducer from './slicePagesReducer';
import perPageReducer from './slicePrePageReducer';
import inputSearchReducer from './sliceSearchReducer';
import apiResult from './createApiResult';
import charactersSlice from './sliceCharactersReducer';
import apiResultCharacters from './createApiCharacters';

export const store = configureStore({
  reducer: {
    inputSearch: inputSearchReducer,
    [apiResult.reducerPath]: apiResult.reducer,
    [apiResultCharacters.reducerPath]: apiResultCharacters.reducer,
    characters: charactersSlice,
    pages: pagesReducer,
    perPage: perPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiResult.middleware,
      apiResultCharacters.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
