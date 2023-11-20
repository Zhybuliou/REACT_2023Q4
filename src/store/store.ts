import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import pagesReducer from './slicePagesReducer';
import perPageReducer from './slicePrePageReducer';
import inputSearchReducer from './sliceSearchReducer';
import apiResult from './createApiResult';
import charactersSlice from './sliceCharactersReducer';
import apiResultCharacters from './createApiCharacters';

export const rootReducer = combineReducers({
  inputSearch: inputSearchReducer,
  [apiResult.reducerPath]: apiResult.reducer,
  [apiResultCharacters.reducerPath]: apiResultCharacters.reducer,
  characters: charactersSlice,
  pages: pagesReducer,
  perPage: perPageReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        apiResult.middleware,
        apiResultCharacters.middleware
      ),
  });

const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
