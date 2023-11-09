import express from "express";
import { createRestaurant, getUserRestaurants, handleRestaurantUpdate, handleRestaurantDelete } from "@/Controller";
import { authenticate } from "@/Utils";

export const restaurantRoutes = express.Router();

restaurantRoutes.use(authenticate);
restaurantRoutes.post("/restaurants", createRestaurant);
restaurantRoutes.get("/restaurants", getUserRestaurants);
restaurantRoutes.put("/restaurants/:restaurantId", handleRestaurantUpdate);
restaurantRoutes.delete("/restaurants/:restaurantId", handleRestaurantDelete);
