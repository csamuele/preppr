import { pool } from 'Model';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    hashedPassword: string;
}

export const registerUser = async (userData: UserData) => {
    //console.log(pool.)
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
