import mongoose from "mongoose";

//connecting mongodb database using async await

const connectDB=async()=>{
    try
    {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Connected Successfully....");
    }
    catch(error)
    {
        console.log("Mongo DB Connection failed:",error.message);
    }
}

export default connectDB;