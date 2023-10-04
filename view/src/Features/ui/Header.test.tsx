//path src/features/ui/Header.test.tsx
import { render, screen } from '@testing-library/react';
import {Header} from './Header';
test('renders header with app title and login button', () => {
    // Render the Header component
    render(<Header />);
    // Test if the AppBar title "preppr" is present
    const appBarTitle = screen.getByText(/preppr/i);
    expect(appBarTitle).toBeInTheDocument();
    // Test if the login button is present
    const loginButton = screen.getByRole('link', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
});