import express from "express";
import { getNearestHospitals } from "../controller/EmergencyController.js";

const LocationRoute = express.Router();

LocationRoute.get("/location", getNearestHospitals);

export default LocationRoute;
