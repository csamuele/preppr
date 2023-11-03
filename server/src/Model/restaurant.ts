import {pool} from 'Model';
import {QueryResult} from 'pg';

export interface RestaurantFormData {
    name: string;
    description: string;
    user_id: string;
}
export interface RestaurantData {
    restaurant_id: string;
    name: string;
    description: string;
    user_id: string;
}
/**
 * Registers a new restaurant in the database.
 * @param restaurantData - The data for the new restaurant.
 * @returns The ID of the newly created restaurant.
 * @throws An error if there is a server error.
 */
export const insertRestaurant = async (restaurantData: RestaurantFormData): Promise<string> => {
    try {
        const {name, description, user_id} = restaurantData;
        const result = await pool.query(
            `INSERT INTO restaurants (name, description, user_id) VALUES ($1, $2, $3) RETURNING restaurant_id`,
            [name, description, user_id]
        );
        return result.rows[0].restaurant_id;
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}

/**
 * Retrieves all restaurants associated with a given user ID from the database.
 * @param user_id The ID of the user whose restaurants to retrieve.
 * @returns A Promise that resolves to a QueryResult object containing the retrieved restaurants.
 * @throws An error if there is a server error.
 */
export const fetchUserRestaurants = async (user_id: string): Promise<RestaurantData[]> => {
    try {
        const result = await pool.query(
            `SELECT * FROM restaurants WHERE user_id = $1`,
            [user_id]
        );
        return result.rows as RestaurantData[];
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}