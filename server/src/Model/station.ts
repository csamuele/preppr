import { pool } from '@/Model';

export interface CreateStationFormData {
    name: string;
    restaurant_id: string;
    user_id: string;
}

export interface UpdateStationFormData {
    name: string;
    station_id: string;
}

export interface StationData {
    station_id: string;
    name: string;
    restaurant_id: string;
    user_id: string;
}

/**
 * Inserts a new station into the database.
 * @param {CreateStationFormData} stationData - The data for the new station.
 * @returns {Promise<string>} - The ID of the newly inserted station.
 * @throws Will throw an error if there is a server error.
 */
export const createStation = async (stationData: CreateStationFormData): Promise<string> => {
    try {
        const {name, restaurant_id, user_id} = stationData;
        const result = await pool.query(
            `INSERT INTO stations (name, restaurant_id, user_id) VALUES ($1, $2, $3) RETURNING station_id`,
            [name, restaurant_id, user_id]
        );
        return result.rows[0].station_id;
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}

/**
 * Retrieves all stations associated with a given restaurant ID from the database.
 * @param {string} restaurant_id - The ID of the restaurant whose stations to retrieve.
 * @returns {Promise<StationData[]>} - A Promise that resolves to a QueryResult object containing the retrieved stations.
 * @throws Will throw an error if there is a server error.
 */
export const retrieveRestaurantStations = async (restaurant_id: string): Promise<StationData[]> => {
    try {
        const result = await pool.query(
            `SELECT * FROM stations WHERE restaurant_id = $1`,
            [restaurant_id]
        );
        return result.rows as StationData[];
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}

/**
 * Retrieves a station from the database by its ID.
 * @param {string} station_id - The ID of the station to retrieve.
 * @returns {Promise<StationData>} - A Promise that resolves to a QueryResult object containing the retrieved station.
 * @throws Will throw an error if there is a server error.
 */
export const retrieveStation = async (station_id: string): Promise<StationData> => {
    try {
        const result = await pool.query(
            `SELECT * FROM stations WHERE station_id = $1`,
            [station_id]
        );
        return result.rows[0] as StationData;
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}

/**
 * Updates a station's name in the database.
 * @param {StationData} stationData - An object containing the station ID and name.
 * @throws Will throw an error if there is a server error.
 */
export const updateStation = async (stationData: UpdateStationFormData): Promise<void> => {
    try {
        const { name, station_id} = stationData;
        console.log(stationData);
        await pool.query(
            `UPDATE stations SET name = $1 WHERE station_id = $2 RETURNING *`,
            [name, station_id]
        );
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}

/**
 * Deletes a station from the database.
 * @param {string} station_id - The ID of the station to delete.
 * @throws Will throw an error if there is a server error.
 */
export const deleteStation = async (station_id: string): Promise<void> => {
    try {
        await pool.query(
            `DELETE FROM stations WHERE station_id = $1`,
            [station_id]
        );
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
}