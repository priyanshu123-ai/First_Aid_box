import express from "express"
import { ProfileDetail, profileDetailById } from "../controller/Profile.js";

const userProfileRoute = express.Router();

userProfileRoute.post("/profile",ProfileDetail)
userProfileRoute.get("/profileDetail/:id",profileDetailById)

export default userProfileRoute