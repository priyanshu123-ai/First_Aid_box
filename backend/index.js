import express from "express"
import dotenv from "dotenv"
import database from "./utils/database.js";
import UserRouter from "./routes/UserRoute.js";


const app = express();

app.use(express.json());

const port = process.env.PORT || 4000

database()

app.use("/api/v1",UserRouter);

app.listen(port,() => {
    console.log(`Server is Running at Port NO ${port}`);
})





