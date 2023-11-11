import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
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

describe('Tests for the Card List component', () => {
  it('Check render page App', () => {
    setup();
    expect(screen.getByText(/Star wars/i)).toBeInTheDocument();
  });
  it('Check render pre Loader', () => {
    setup();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
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

describe('Tests for the Card component:', () => {
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
  it('Tests for the 404 Page component', async () => {
    await render(
      <MemoryRouter initialEntries={['/pagess/1/']}>
        <AppContext.Provider value={Mock}>
          <App />
        </AppContext.Provider>
      </MemoryRouter>
    );
    screen.debug();
    await expect(screen.getByText('404'));
  });
});
