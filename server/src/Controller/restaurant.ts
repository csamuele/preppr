import { Request, Response, NextFunction } from "express";
import { insertRestaurant, fetchUserRestaurants, User, updateRestaurant, fetchRestaurant, deleteRestaurant } from "@/Model";

/**
 * Creates a new restaurant in the database.
 * @param req - The request object containing the restaurant's information.
 * @param res - The response object to send the result of the operation.
 * @returns A JSON object with a message indicating whether the restaurant was created successfully or not.
 */
export const createRestaurant = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (name.length > 50) {
            return res.status(400).json({ message: "Name can't be longer than 50 characters" });
        }
        if (description.length > 1000) {
            return res.status(400).json({ message: "Description can't be longer than 1000 characters" });
        }
        const user = req.user as User;
        const restaurantId = await insertRestaurant({
            name,
            description,
            user_id: user.user_id,
        });
        res.status(201).json({ message: "Restaurant created", restaurantId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Retrieves the restaurants associated with the authenticated user.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {Promise<void>} - A Promise that resolves when the restaurants have been retrieved and sent in the response.
 */
export const getUserRestaurants = async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const restaurants = await fetchUserRestaurants(user.user_id);
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" }); 
    }
}

/**
 * Handles updating a restaurant's name and description.
 * @param req - The request object containing the new name and description.
 * @param res - The response object to send the result of the update.
 * @returns A JSON response indicating success or failure of the update.
 */
export const handleRestaurantUpdate = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const { restaurantId } = req.params;
        if (name.length > 50) {
            return res.status(400).json({ message: "Name can't be longer than 50 characters" });
        }
        if (description.length > 1000) {
            return res.status(400).json({ message: "Description can't be longer than 1000 characters" });
        }
        const user = req.user as User;
        const restaurant = await fetchRestaurant(restaurantId);
        if (restaurant.user_id !== user.user_id) {
            return res.status(403).json({ message: "Forbidden" });
        }
        await updateRestaurant({
            restaurant_id: restaurantId,
            name,
            description,
            user_id: user.user_id,
        });
        res.status(200).json({ message: "Restaurant updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }

}

/**
 * Handles deleting a restaurant.
 * @param req - The request object containing the restaurant ID.
 * @param res - The response object to send the result of the deletion.
 * @returns A JSON response indicating success or failure of the deletion.
 */
export const handleRestaurantDelete = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.params;
        const user = req.user as User;
        const restaurant = await fetchRestaurant(restaurantId);
        if (restaurant.user_id !== user.user_id) {
            return res.status(403).json({ message: "Forbidden" });
        }
        await deleteRestaurant(restaurantId);
        res.status(200).json({ message: "Restaurant deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}