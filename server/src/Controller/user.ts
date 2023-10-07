import { registerUser } from "Model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

/**
 * Creates a new user in the database.
 * @param req - The request object containing the user's information.
 * @param res - The response object to send the result of the operation.
 * @returns A JSON object with a message indicating whether the user was created successfully or not.
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
    
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Insert user into the database
        await registerUser({
        firstName,
        lastName,
        email,
        hashedPassword,
        });
    
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    };
    