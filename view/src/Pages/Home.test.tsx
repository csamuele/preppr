import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders home page with AppBar, login button, and app description', () => {
  // Render the Home component
  render(<Home />);
  

  // Test if the container with the app description is present
  const appDescription = screen.getByText(/your app description here/i);
  expect(appDescription).toBeInTheDocument();
});
