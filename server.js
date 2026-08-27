import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";



//loding environment variables
dotenv.config();

//creating express application
const app=express();

//connect to Mongodb
connectDB();

//connecting Middleware
app.use(cors());
app.use(express.json());

//testing route
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"shoppyGlobe API is Running Successfully...."
    });
});

//api routes
app.use("/",authRoutes);
app.use("/products",productRoutes);
app.use("/cart",cartRoutes);

//global error handler
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(err.status || 500).json({
        success:false,
        message:err.message || "Internal Server Error"
    });
});


//starting server
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server Running at http://localhost:${PORT}`);
});