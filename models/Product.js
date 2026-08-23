import mongoose from "mongoose";

//creating schema or table for product
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product Name is required"],
        trim:true
    },
    price:{
        type:Number,
        required:[true,"Product Price is required"],
        min:[0,"Price cannot be negative"]

    },
    description:{
        type:String,
        required:[true,"Product Description is required"],
        trim:true
    },
    stock:{
        type:Number,
        required:[true,"Stock Quantity is required"],
        min:[0,"Stock Cannot be negative"]
    }

},
{
    timestamp:true
}

);
const Product=mongoose.model("Product",productSchema);

export default Product;
