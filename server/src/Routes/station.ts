import express from "express";
import { 
    handleStationCreate, 
    handleStationDelete, 
    handleRestaurantStationsRetrieve, 
    handleStationRetrieve, 
    handleStationUpdate,
    checkStationOwnership
} from "@/Controller";
import { authenticate } from "@/Utils";

export const stationRoutes = express.Router();

stationRoutes.use(authenticate);
stationRoutes.post("/stations", handleStationCreate);
stationRoutes.get("/restaurants/:restaurantId/stations", handleRestaurantStationsRetrieve);
stationRoutes.get("/stations/:id", handleStationRetrieve);
//stationRoutes.use(checkStationOwnership);
stationRoutes.put("/stations/:id", checkStationOwnership, handleStationUpdate);
stationRoutes.delete("/stations/:id", handleStationDelete);
