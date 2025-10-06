import express from "express"
import dotenv from "dotenv"
import database from "./utils/database.js";
import UserRouter from "./routes/UserRoute.js";

import cookieParser from "cookie-parser";

import cors from "cors"
import ImageRouter from "./routes/ImageRoute.js";


const app = express();

app.use(express.json());

const port = process.env.PORT || 4000

app.use(cookieParser())

app.use(
    cors({
        origin:["http://localhost:5173"],
        credentials: true

    })
)

database()

app.use("/api/v1",UserRouter);

app.use("/api/v2",ImageRouter);

app.listen(port,() => {
    console.log(`Server is Running at Port NO ${port}`);
})





