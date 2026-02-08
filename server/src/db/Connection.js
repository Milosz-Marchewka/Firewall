import mongoose from "mongoose";

let connection;

export const connectDB = async (URI)=>{
    if(!connection){
        try{
            connection = await mongoose.connect(URI);
            console.log("Connected to MongoDB");
            
        } catch(err){
            process.exit(1);
        }
    }
}