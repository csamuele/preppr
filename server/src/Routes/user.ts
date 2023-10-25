import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { createUser, deleteUser, login, getUser } from 'Controller';
import { User } from '@/Model';
import { authenticate } from '@/Utils';

/**
 * Express router for user routes.
 */
export const userRoutes = express.Router();

userRoutes.post('/register', createUser);
userRoutes.post('/login', login);
userRoutes.delete('/users/:userId', deleteUser);
userRoutes.get('/me', authenticate ,getUser);