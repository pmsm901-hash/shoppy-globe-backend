import mongoose from "mongoose";

//creating cart schema or table
const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:[1,"Quantity must be at least 1"]
    }
},
    {
        timestamps:true
    }
);

const Cart=mongoose.model("Cart",cartSchema);
export default Cart;