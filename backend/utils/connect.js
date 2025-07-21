import mongoose from "mongoose";

export const connectDB = async (url) => {
    try {
        await mongoose.connect(url).then(() => console.log(`MongoDB connected`));
    } catch (error) {
        console.log('Error connecting to Database');
    }
}