import express from "express";
import { getNearestHospitals } from "../controller/EmergencyController.js";
import { alert } from "../utils/nodemailer.js";

const LocationRoute = express.Router();

LocationRoute.get("/location", getNearestHospitals);
LocationRoute.post("/mail",alert)

export default LocationRoute;
