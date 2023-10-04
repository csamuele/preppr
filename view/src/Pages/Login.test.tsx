import { render, screen } from '@testing-library/react';
import Login from './Login';

//check if login page renders with email and password fields with a submit button and a google sso button
test('renders login page with email and password fields with a submit button and a google sso button', () => {
    // Render the Login component
    render(<Login />);
    // Test if the email field is present
    const emailField = screen.getByRole('textbox', { name: /email/i });
    expect(emailField).toBeInTheDocument();
    // Test if the password field is present
    const passwordField = screen.getByLabelText(/password/i);
    expect(passwordField).toBeInTheDocument();
    // Test if the login button is present
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    // Test if the google sso button is present
    const googleButton = screen.getByRole('link', { name: /login with google/i });
    expect(googleButton).toBeInTheDocument();
});