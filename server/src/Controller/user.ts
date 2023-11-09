import { registerUser, removeUser, updateUser } from "Model";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { User } from "@/Model";


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
        const userId = await registerUser({
            firstName,
            lastName,
            email,
            hashedPassword,
        });
        // Send response with userId
        res.status(201).json({ message: "User created", userId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Deletes a user with the specified ID.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response indicating whether the user was successfully deleted or if there was a server error.
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        await removeUser(userId);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


/**
 * Authenticates a user with their credentials and sets the user's sessionId cookie.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 */
export const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: User, info: any) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
            return;
        }
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
                return;
            }
            res.status(200).json({ message: 'Logged in' });

            console.log('successfully logged in')
        });
    })(req, res, next);
}
/**
 * Logs out the current user.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 */
export const logout = (req: Request, res: Response) => {
    req.logout((err: any) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
            return;
        }
        res.clearCookie('connect.sid');
        res.clearCookie('session');
        res.status(200).json({ message: 'Logged out' });
    });
}
/**
 * Retrieves the user object for the currently authenticated user.
 * Excludes the hashedPassword property from the returned user object.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A JSON response containing the user object without the hashedPassword property.
 */
export const getUser = async (req: Request, res: Response) => {
    const user = req.user as User;
    
    // Exclude hashedPassword property from user object
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword });
}

/**
 * Handles updating a user's first name and/or last name.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A JSON response containing the updated user object.
 */
export const handleUserUpdate = async (req: Request, res: Response) => {
    const user = req.user as User;
    const { firstName, lastName } = req.body;
    //check if body is not empty
    if (!firstName && !lastName) {
        res.status(400).json({ message: "No data was provided" });
        return;
    }

    const updatedUser = await updateUser(user.user_id, { first_name: firstName, last_name: lastName });
    res.status(200).json(updatedUser);
}
