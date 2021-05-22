import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app',async () => {
  render(<App />);
  const linkElement = screen.getByText(/DASHBOARD/i);
  expect(linkElement).toBeInTheDocument();
})
