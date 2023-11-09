import express from 'express';
import { createUser, deleteUser, login, getUser, logout, handleUserUpdate } from 'Controller';
import { authenticate } from '@/Utils';

/**
 * Express router for user routes.
 */
export const userRoutes = express.Router();

userRoutes.post('/register', createUser);
userRoutes.post('/login', login);
userRoutes.post('/logout', logout);
userRoutes.delete('/users/:userId', deleteUser);
userRoutes.get('/me', authenticate ,getUser);
userRoutes.put('/me', authenticate, handleUserUpdate);