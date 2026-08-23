import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=async(req,res,next)=>{
    try{
        const{name,email,password}=req.body;

        //validate fields
        if(!name || !email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Name,email & Password Are  required"
            });
        }

        //checking password length
        if(password.length < 6)
        {
            return res.status(400).json({
                success:false,
                message:"Password must be at least 6 characters"
            });
        }

        //checking existing user
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User already exists"
            });
        }

        //Hash password
        const hashPassword=await bcrypt.hash(password,10);

        //create user
        const user=await User.create({name,email,password:hashPassword});
        res.status(201).json({
            success:true,
            message:"User Registered Successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email

            }
        });
    }
    catch(error)
    {
        next(error);
    }
}

//login
export const login=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Email & Password are required"
            });
        }

        //find user
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            });
        }

        //compare password
        const passwordMatch=await bcrypt.compare(password,user.password);
        if(!passwordMatch)
        {
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            });
        }

        //generate JWT
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({
            success:true,
            message:"Login Successful",
            token
        });


    }
    catch(error)
    {
        next(error);
    }
}