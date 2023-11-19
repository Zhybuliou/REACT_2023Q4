import { waitFor } from '@testing-library/react';
// We're using our own custom render function and not RTL's render.
import renderWithProviders from '../testUtils';
import App from '../App';

test('fetches & receives a user after clicking the fetch user button', async () => {
  const { getByText } = renderWithProviders(<App />);
  expect(getByText(/Loading.../i)).toBeInTheDocument();
  waitFor(() => {
    expect(getByText(/ssssss/i)).toBeInTheDocument();
  });
});
