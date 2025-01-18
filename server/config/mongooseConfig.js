import mongoose from "mongoose";
import { MongoClient } from "mongodb";

export const connectMongoose = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}