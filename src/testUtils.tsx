import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import { MemoryRouter } from 'react-router-dom';
import { rootReducer, type AppStore, type RootState } from './store/store';
import apiResult from './store/createApiResult';
import apiResultCharacters from './store/createApiCharacters';
import ErrorBoundary from './components/ErrorBoundary';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          apiResult.middleware,
          apiResultCharacters.middleware
        ),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <ErrorBoundary>
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>;
        </MemoryRouter>
      </ErrorBoundary>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithProviders;
