import { Request, Response } from "express";
import { createStation, retrieveRestaurantStations, updateStation, retrieveStation, deleteStation, User } from "@/Model";
import { createOwnershipCheckMiddleware } from "@/Utils";

/**
 * Middleware function that checks if the authenticated user owns the station.
 * @param req The request object containing the station ID.
 * @param res The response object to send an error if the user doesn't own the station.
 */
export const checkStationOwnership = createOwnershipCheckMiddleware(retrieveStation, "station");

/**
 * Creates a new station in the database.
 * @param req - The request object containing the station's information.
 * @param res - The response object to send the result of the operation.
 * @returns A JSON object with a message indicating whether the station was created successfully or not.
 */
export const handleStationCreate = async (req: Request, res: Response) => {
    try {
        const { name, restaurantId } = req.body;
        if (name.length > 50) {
            return res.status(400).json({ message: "Name can't be longer than 50 characters" });
        }
        const user = req.user as User;
        const stationId = await createStation({
            name,
            restaurant_id: restaurantId,
            user_id: user.user_id
        });
        res.status(201).json({ message: "Station created", stationId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * Retrieves the stations for a given restaurant and sends them as a JSON response.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A Promise that resolves to void.
 */
export const handleRestaurantStationsRetrieve = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.params;
        const stations = await retrieveRestaurantStations(restaurantId);
        res.status(200).json(stations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * Updates a station with the given ID.
 * @param req - The request object containing the station ID, name, and restaurant ID.
 * @param res - The response object to send the result of the update operation.
 * @returns A JSON response indicating success or failure of the update operation.
 */
export const handleStationUpdate = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (name.length > 50) {
            return res.status(400).json({ message: "Name can't be longer than 50 characters" });
        }
        const response = await updateStation({
            station_id: id,
            name,
        });
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * Retrieves a station by ID and sends it as a JSON response.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the retrieved station.
 */
export const handleStationRetrieve = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const station = await retrieveStation(id);
        res.status(200).json(station);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * Deletes a station with the given ID.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response indicating whether the station was successfully deleted or not.
 */
export const handleStationDelete = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteStation(id);
        res.status(200).json({ message: "Station deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}