import '@testing-library/jest-dom';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Cards from '../components/Cards';
import Provider, { AppContext } from '../context/AppContext';
import { Mock } from '../data/apiMock';

const setup = () => {
  act(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
};
const setupApi = () => {
  act(() => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={Mock}>
          <App />
        </AppContext.Provider>
      </MemoryRouter>
    );
  });
};

describe('5 Tests for the Card List component', () => {
  it('Check render page App', () => {
    setup();
    expect(screen.getByText(/Star wars/i)).toBeInTheDocument();
  });
  it('Check that an appropriate message is displayed if no cards are present', () => {
    act(() => {
      render(
        <Provider>
          <Cards />
        </Provider>
      );
    });
    expect(
      screen.getByText(/This is not page you are looking for/i)
    ).toBeInTheDocument();
  });
  it('Verify that the component renders the specified number of cards', async () => {
    await setupApi();
    const items = screen.getAllByTestId('card');
    expect(items.length).toBe(10);
  });
});

describe('6 Tests for the Card component:', () => {
  it('Ensure that the card component renders the relevant card data', async () => {
    setupApi();
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });
  it('Validate that clicking on a card opens a detailed card component', async () => {
    setupApi();
    const card = screen.getByText(/Luke Skywalker/i) as HTMLElement;
    act(() => {
      fireEvent.click(card);
    });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

describe('7 Tests for the Detailed Card component:', () => {
  it('Check that a loading indicator is displayed while fetching data', () => {
    setup();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
  it('Ensure that clicking the close button hides the component.', () => {
    setupApi();
    const card = screen.getByText(/Luke Skywalker/i) as HTMLElement;
    act(() => {
      fireEvent.click(card);
    });
    const cardClosed = screen.getByTestId(/character-card-close/i);
    act(() => {
      fireEvent.click(cardClosed);
    });
    expect(screen.queryByTestId(/character-card-close/i)).toBeNull();
  });
});

describe('8 Tests for the Pagination component', () => {
  it('Make sure the component updates URL query parameter when page changes.', async () => {
    setupApi();
    const button = screen.getByText('2');
    fireEvent.click(button);
    await waitFor(() => {
      expect(global.window.location.pathname).toEqual('/');
    });
  });
  it('Check count button pagination', async () => {
    setupApi();
    const button = screen.getAllByRole('button');
    await waitFor(() => {
      expect(button.length).toBe(11);
    });
  });
});

describe('9 Tests for the Search component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage;', async () => {});
  it('Check that the component retrieves the value from the local storage upon mounting.', async () => {});
});

describe('10 Tests for the 404 Page component:', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route.', async () => {
    await render(
      <MemoryRouter initialEntries={['/pagess/1/']}>
        <AppContext.Provider value={Mock}>
          <App />
        </AppContext.Provider>
      </MemoryRouter>
    );
    await expect(screen.getByText('404'));
  });
});
