import { Request, Response, NextFunction } from 'express';
import { User } from '@/Model';
/**
 * Middleware function that checks if the authenticated user owns the entity being accessed.
 * @param retrieveEntity - Function that retrieves the entity from the database.
 * @param entityName - Name of the entity being accessed.
 * @returns Express middleware function.
 */
export function createOwnershipCheckMiddleware(retrieveEntity: (id: string) => Promise<any>, entityName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const entityId = req.params.id;
      console.log(entityId);
      const entity = await retrieveEntity(entityId);
      console.log(entity);
      if (!entity) {
        return res.status(404).json({ message: `${entityName} not found` });
      }
      const user = req.user as User;
      if (entity.user_id !== user.user_id) {
        return res.status(403).json({ message: `You don't have permission to update this ${entityName}` });
      }
      next();
    }
  }