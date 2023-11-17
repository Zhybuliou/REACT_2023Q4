import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import App from '../App';
import { RootState, store } from '../store/store';
import { addInputSearch } from '../store/sliceSearchReducer';
import { addPerPage } from '../store/slicePrePageReducer';
import ErrorBoundary from '../components/ErrorBoundary';

describe('5 Tests for the Card List component', () => {
  it('Check render page App', () => {
    render(
      <ErrorBoundary>
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      </ErrorBoundary>
    );
    expect(screen.getByText(/Star wars/i)).toBeInTheDocument();
  });
  // it('Check that an appropriate message is displayed if no cards are present', async () => {
  //   await act(() => {
  //     render(
  //       <ErrorBoundary>
  //         <MemoryRouter initialEntries={['/pages/1222/']}>
  //           <Provider store={store}>
  //             <App />
  //           </Provider>
  //         </MemoryRouter>
  //       </ErrorBoundary>
  //     );
  //   });
  //   waitFor(() =>
  //     expect(
  //       screen.getByText(/This is not page you are looking for/i)
  //     ).toBeInTheDocument()
  //   );
  //   expect(
  //     screen.getByText(/This is not page you are looking for/i)
  //   ).toBeInTheDocument();
  // });
  // it('Verify that the component renders the specified number of cards', async () => {
  //   await render(
  //     <ErrorBoundary>
  //       <MemoryRouter>
  //         <Provider store={store}>
  //           <App />
  //         </Provider>
  //       </MemoryRouter>
  //     </ErrorBoundary>
  //   );
  //   const items = screen.getAllByTestId('card');
  //   expect(items.length).toBe(10);
  // });
});

// describe('6 Tests for the Card component:', () => {
//   it('Ensure that the card component renders the relevant card data', async () => {
//     setupApi();
//     expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
//   });
//   it('Validate that clicking on a card opens a detailed card component', async () => {
//     setupApi();
//     const card = screen.getByText(/Luke Skywalker/i) as HTMLElement;
//     act(() => {
//       fireEvent.click(card);
//     });
//     expect(screen.getByText(/Loading/i)).toBeInTheDocument();
//   });
// });

// describe('7 Tests for the Detailed Card component:', () => {
//   it('Check that a loading indicator is displayed while fetching data', () => {
//     setup();
//     expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
//   });
//   it('Ensure that clicking the close button hides the component.', () => {
//     setupApi();
//     const card = screen.getByText(/Luke Skywalker/i) as HTMLElement;
//     act(() => {
//       fireEvent.click(card);
//     });
//     const cardClosed = screen.getByTestId(/character-card-close/i);
//     act(() => {
//       fireEvent.click(cardClosed);
//     });
//     expect(screen.queryByTestId(/character-card-close/i)).toBeNull();
//   });
// });

// describe('8 Tests for the Pagination component', () => {
//   it('Make sure the component updates URL query parameter when page changes.', async () => {
//     setupApi();
//     const button = screen.getByText('2');
//     fireEvent.click(button);
//     await waitFor(() => {
//       expect(global.window.location.pathname).toEqual('/');
//     });
//   });
//   it('Check count button pagination', async () => {
//     setupApi();
//     const button = screen.getAllByRole('button');
//     await waitFor(() => {
//       expect(button.length).toBe(11);
//     });
//   });
// });

// describe('9 Tests for the Search component', () => {
//   beforeEach(() => {
//     Object.defineProperty(window, 'localStorage', {
//       value: {
//         getItem: vi.fn(() => null),
//         setItem: vi.fn(() => null),
//       },
//       writable: true,
//     });
//   });
//   it('Verify that clicking the Search button saves the entered value to the local storage;', async () => {
//     await render(
//       <ErrorBoundary>
//         <MemoryRouter>
//           <Provider store={store}>
//             <App />
//           </Provider>
//         </MemoryRouter>
//       </ErrorBoundary>
//     );
//     const input = screen.getByTestId('input-search') as HTMLInputElement;
//     fireEvent.change(input, { target: { value: 'dd' } });
//     const button = screen.getByTestId('button-search') as HTMLElement;
//     fireEvent.click(button);
//     await waitFor(() =>
//       expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
//     );
//   });
//   it('Check that the component retrieves the value from the local storage upon mounting.', async () => {
//     render(
//       <ErrorBoundary>
//         <MemoryRouter>
//           <Provider store={store}>
//             <App />
//           </Provider>
//         </MemoryRouter>
//       </ErrorBoundary>
//     );
//     await waitFor(() =>
//       expect(window.localStorage.getItem('search')).toEqual(null)
//     );
//   });
// });

describe('10 Tests for the 404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route.', async () => {
    render(
      <MemoryRouter initialEntries={['/pagess/1/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('404'));
  });
});

describe('Tests ErrorComponent.tsx:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route.', async () => {
    render(
      <ErrorBoundary>
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      </ErrorBoundary>
    );
    const buttonError = screen.getByText('Get Error');
    fireEvent.click(buttonError);
    expect(screen.getByText(/This is a test error/i)).toBeInTheDocument();
  });
});

function TestingComponent() {
  const inputSearch = useSelector(
    (state: RootState) => state.inputSearch.inputSearch
  );
  const pages = useSelector((state: RootState) => state.pages.pages);
  const perPage = useSelector((state: RootState) => state.perPage.perPage);
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );
  const dispatch = useDispatch();
  return (
    <>
      <p data-testid="test-input-search">{inputSearch}</p>
      <p data-testid="test-input-pages">{pages}</p>
      <p data-testid="test-characters">{characters?.length}</p>
      <p data-testid="test-perPage">{perPage}</p>
      <button type="button" onClick={() => dispatch(addPerPage('20'))}>
        change per page
      </button>
      <button type="button" onClick={() => dispatch(addInputSearch('dd'))}>
        change input value
      </button>
    </>
  );
}

describe('Tests Context:', () => {
  it('Tests Context.', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <TestingComponent />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId(/test-perPage/i).textContent).toBe('10');
    expect(screen.getByTestId(/test-input-pages/i).textContent).toBe('1');
    expect(screen.getByTestId(/test-input-search/i).textContent).toEqual('');
    const changeButton = screen.getByText(/change per page/i);
    fireEvent.click(changeButton);
    const changeButtonInput = screen.getByText(/change input value/i);
    fireEvent.click(changeButtonInput);
    waitFor(() =>
      expect(screen.getByTestId(/test-perPage/i).textContent).toBe('20')
    );
    waitFor(() => expect(screen.getByText(/'dd'/i)).toBeInTheDocument());
  });
});
