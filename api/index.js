import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
    .connect(process.env.DATABASE)
    .then(() => {
    console.log("MongoDB Database Connected!");
}).catch((err)=> {
    console.log(err);
});

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);