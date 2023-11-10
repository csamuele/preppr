import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { localStrategy } from './Utils/passport-config';
import { userRoutes, restaurantRoutes, stationRoutes } from 'Routes';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
  },
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);


app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
  }
));
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', stationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


