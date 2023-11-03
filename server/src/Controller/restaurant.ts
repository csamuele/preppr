import { Request, Response, NextFunction } from "express";
import { insertRestaurant, fetchUserRestaurants, User } from "@/Model";

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