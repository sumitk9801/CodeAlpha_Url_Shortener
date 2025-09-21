import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connect = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(connect)
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

export default connectDB;
