import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from 'Model';
import { createUser } from 'Controller';

export const userRoutes = express.Router();

userRoutes.post('/register', createUser);

