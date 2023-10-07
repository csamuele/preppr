import { pool } from 'Model';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    hashedPassword: string;
}

/**
 * Registers a new user in the database.
 * @param userData - An object containing user data including first name, last name, email, and hashed password.
 * @throws Will throw an error if there is a server error.
 */
export const registerUser = async (userData: UserData) => {
    try {
        const { firstName, lastName, email, hashedPassword } = userData;
        await pool.query(
            `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
            [firstName, lastName, email, hashedPassword]
        );
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}
