//Test suite for signup page with a form with first name, last name, email, password, and confirm password fields and a submit button

import { render, screen } from '@testing-library/react';
import Signup from './Signup';

test('renders signup page with a form with first name, last name, email, password, and confirm password fields and a submit button', () => {
    // Render the Signup component
    render(<Signup />);
    // Test if the first name field is present
    const firstNameField = screen.getByLabelText(/first name/i);
    expect(firstNameField).toBeInTheDocument();
    // Test if the last name field is present
    const lastNameField = screen.getByLabelText(/last name/i);
    expect(lastNameField).toBeInTheDocument();
    // Test if the email field is present
    const emailField = screen.getByLabelText(/email/i);
    expect(emailField).toBeInTheDocument();
    // Test if the password field is present
    const passwordField = screen.getByLabelText("Password");
    expect(passwordField).toBeInTheDocument();
    // Test if the confirm password field is present
    const confirmPasswordField = screen.getByLabelText("Confirm Password");
    expect(confirmPasswordField).toBeInTheDocument();
    // Test if the signup button is present
    const signupButton = screen.getByRole('button', { name: /sign up/i });
    expect(signupButton).toBeInTheDocument();
});