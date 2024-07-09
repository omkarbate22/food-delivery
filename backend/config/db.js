import mongoose from "mongoose";

export const connectDB = async () => {

    await mongoose.connect("mongodb+srv://omkarbate78:Omkar2207@cluster0.goffczb.mongodb.net/food-del").then(()=> console.log("DB connected"));

} 

