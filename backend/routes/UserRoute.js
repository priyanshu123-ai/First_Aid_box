import express from "express"
import { login, logout, register } from "../controller/User.controller.js";

const UserRouter = express.Router();

UserRouter.post("/register",register)
UserRouter.post("/login",login)
UserRouter.post("/logout",logout)

export default UserRouter

