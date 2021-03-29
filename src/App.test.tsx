import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ip button', () => {
  render(<App />);
  const ipButtonElement = screen.getByText(/My IP/i);
  expect(ipButtonElement).toBeInTheDocument();
});
