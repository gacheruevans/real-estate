import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./rouotes/user.route.js";

dotenv.config();

mongoose
    .connect(process.env.DATABASE)
    .then(() => {
    console.log("MongoDB Database connected");
}).catch((err)=> {
    console.log(err);
});

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use('/api/user', userRouter);