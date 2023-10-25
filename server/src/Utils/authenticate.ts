import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    user_id: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

/**
 * Middleware function to authenticate user requests using JWT tokens.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 * @returns Returns the next function if authentication is successful, otherwise returns an error response.
 */
export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        req.currentUser = payload;
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
};
