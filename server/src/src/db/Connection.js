import mongoose from "mongoose";

let connection;

export const connectDB = async (URI)=>{
    if(!connection){
        try{
            connection = await mongoose.connect(URI);
            console.log("MongoDB connected");
        } catch(err){
            console.log(`MongoDB connection error: ${err}`);
            process.exit(1);
        }
    }
}