import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import router from "./router";
import errorsMiddleware from "./middlewares/errors";

configDotenv()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorsMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL!)
        app.listen(PORT, () => console.log('server start on port:', PORT))
    } catch (error) {
        console.log(error)
    }
}

start()