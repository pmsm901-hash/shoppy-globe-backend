import mongoose from "mongoose";

//creating table or schema for user
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trime:true

    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:6
    },
},
{
        timestamps:true
}

);

const User=mongoose.model("User",userSchema);
export default User;