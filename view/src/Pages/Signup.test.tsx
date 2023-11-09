import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {Signup} from './Signup';

const mockAlert = jest.fn();
global.alert = mockAlert;
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));
const mockConsoleLog = jest.fn();
global.console.log = mockConsoleLog;


describe('Signup', () => {
  it('should render the form fields', () => {
    render(<Signup />);
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
  });

  it('should display required messages when form fields are empty', async () => {
    render(<Signup />);
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.queryAllByText('Required').length).toBeGreaterThanOrEqual(5);
    });
  });
  it('should display an error message when the email is invalid', async () => {
    render(<Signup />);
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.change(screen.getByRole('textbox', {name: /email/i}), { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });
  it('should display an error message when the password is invalid', async () => {
    render(<Signup />);
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'invalid-password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character')).toBeInTheDocument();
    });
  });
    it('should display an error message when the passwords do not match', async () => {
        render(<Signup />);
        const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'Password2!' } });
        fireEvent.click(submitButton);
    
        await waitFor(() => {
            expect(screen.getByText('Passwords must match')).toBeInTheDocument();
        });
    });


  it('should submit the form when all fields are valid', async () => {
    render(<Signup />);
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.change(screen.getByRole('textbox', { name: /first name/i }), { target: { value: 'John' } });
    fireEvent.change(screen.getByRole('textbox', { name: /last name/i }), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), { target: { value: 'JohnDoe@gmail.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'Password1!' } });


    fireEvent.click(submitButton);

    await waitFor(async () => {
        //check to make sure the alert function was called with User successfully registered
        expect(mockAlert).toHaveBeenCalledWith('You have successfully registered!');
        //check to make sure the navigate function was called with /login
        expect(mockNavigate).toHaveBeenCalledWith('/login');
        //get user id from the console log
        const consoleOutput = mockConsoleLog.mock.calls[0][0];
        const userIdMatch = consoleOutput.match(/User Registered: (.*)/);
        const userId = userIdMatch[1];
        //check to make sure the console log function was called with User Registered: and the user id
        expect(mockConsoleLog).toHaveBeenCalledWith(`User Registered: ${userId}`);
        //delete the user from the database
        await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });
  });
});