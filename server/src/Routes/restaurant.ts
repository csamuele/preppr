import express from "express";
import { createRestaurant, getUserRestaurants } from "@/Controller";

export const restaurantRoutes = express.Router();

restaurantRoutes.post("/restaurants", createRestaurant);
restaurantRoutes.get("/restaurants", getUserRestaurants);