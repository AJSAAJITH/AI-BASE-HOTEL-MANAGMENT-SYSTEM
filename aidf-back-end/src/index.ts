import "dotenv/config";
import express from "express";
import connectDB from "./infrastructure/db";

import hotelsRouter from "./api/hotel";
import usersRouter from "./api/user";
import bookingsRouter from "./api/booking";
import cors from "cors";
import globleErrorHandilngMiddleware from "./api/middleware/global-error-handding-middleware";
import { clerkMiddleware } from "@clerk/express";

// Create an Express instance
const app = express();
// Apply centralized middleware
app.use(clerkMiddleware())

// Middleware to parse JSON data in the request body
app.use(express.json());
app.use(cors());

connectDB();

// middleware
// app.use((req, res, next)=>{
//     res.send("Hello world");
//     next();
// })

app.use("/api/hotels", hotelsRouter);
app.use("/api/users", usersRouter);
app.use("/api/bookings", bookingsRouter);

app.use(globleErrorHandilngMiddleware);

// Define the port to run the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Starting with Port: ${PORT}`);
});
