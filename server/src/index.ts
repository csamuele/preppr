import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { localStrategy, jwtStrategy } from './Utils/passport-config';
import { userRoutes } from 'Routes/user';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);
passport.use(jwtStrategy);


app.use(cors());
app.use(express.json());



app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


