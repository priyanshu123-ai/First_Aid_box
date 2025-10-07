import express from "express";
import dotenv from "dotenv";
import http from "http"; // for creating the server
import database from "./utils/database.js";
import UserRouter from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import ImageRouter from "./routes/ImageRoute.js";
import userProfileRoute from "./routes/ProfileRoute.js";
import { Server } from "socket.io"; // <-- fixed import
import LocationRoute from "./routes/LocationRoute.js";

dotenv.config(); // load environment variables

const app = express();

// create server for socket.io
const server = http.createServer(app);

// initialize socket.io
app.use(
  cors({
    origin: ["http://localhost:5174"], // ✅ correct frontend port
    credentials: true,
  })
);


// optional: socket connection events


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

database();

app.use("/api/v1", UserRouter);
app.use("/api/v2", ImageRouter);
app.use("/api/v3", userProfileRoute);

app.use("/api/v4",LocationRoute)

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is Running at Port NO ${port}`);
});


