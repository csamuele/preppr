import { pool } from 'Model';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { QueryResult } from 'pg';

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    hashedPassword: string;
}

export interface User {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    date_created: Date;
    last_login: Date;
    role: string;
    status: string;
}
/**
 * Maps the result of a database query to a User object.
 * @param result - The result of a database query.
 * @returns A User object.
 */
function mapUser(result: QueryResult<any>): User {
    const row = result.rows[0];
    const user: User = {
        user_id: row.user_id,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        password: row.password,
        date_created: row.date_created,
        last_login: row.last_login,
        role: row.role,
        status: row.status,
    };
    return user;
}


/**
 * Registers a new user in the database.
 * @param userData - An object containing user data including first name, last name, email, and hashed password.
 * @returns The ID of the newly registered user.
 * @throws Will throw an error if there is a server error.
 */
export const registerUser = async (userData: UserFormData): Promise<string> => {
    try {
        const { firstName, lastName, email, hashedPassword } = userData;
        const result = await pool.query(
            `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id`,
            [firstName, lastName, email, hashedPassword]
        );
        return result.rows[0].user_id;
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}

/**
 * Retrieves a user from the database by email.
 * @param email - The email of the user to retrieve.
 * @returns The user object.
 * @throws Will throw an error if there is a server error.
 */
export const getUserByEmail = async (email: string): Promise<User> => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return mapUser(result);
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}

/**
 * Retrieves a user from the database by their ID.
 * @param userId The ID of the user to retrieve.
 * @returns A Promise that resolves with the retrieved User object.
 * @throws An error if there is a server error or the user is not found.
 */
export const getUserById = async (userId: string): Promise<User> => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [userId]);
        return mapUser(result);
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}

export function updateUser(userId: string, updatedFields: Partial<User>): Promise<User>;
export function updateUser(user: User): Promise<User>;
/**
 * Updates a user in the database with the given fields.
 * @param arg1 - Either the user ID or an object containing the updated fields.
 * @param arg2 - An optional object containing the updated fields.
 * @returns A Promise that resolves to the updated User object.
 * @throws An error if there is a server error.
 */
export async function updateUser(arg1: string | User, arg2?: Partial<User>): Promise<User> {
    try {
        let userId: string;
        let updatedFields: Partial<User>;
        if (typeof arg1 === 'string') {
            userId = arg1;
            updatedFields = arg2!;
        } else {
            userId = arg1.user_id;
            updatedFields = arg1;
        }
        const updatedProperties = Object.keys(updatedFields).map((key, index) => `${key} = $${index + 1}`).join(', ');
        const query = `UPDATE users SET ${updatedProperties} WHERE user_id = $${Object.keys(updatedFields).length + 1} RETURNING *`;
        const queryValues = Object.values(updatedFields).concat(userId);
        const result = await pool.query(query, queryValues);
        return mapUser(result);
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}

/**
 * Deletes a user from the database.
 * @param userId - The ID of the user to delete.
 * @throws Will throw an error if there is a server error.
 */
export const removeUser = async (userId: string): Promise<void> => {
    try {
        await pool.query(`DELETE FROM users WHERE user_id = $1`, [userId]);
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}


