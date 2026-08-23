import mongoose from "mongoose";
import Product from "../models/Product"


//getting all products
export const getProducts=async(req,res,next)=>{
    try{
        const products=await Product.find();
        res.status(200).json({
            success:true,
            count:products.length;
            products
        });
    }
    catch(error)
    {
        next(error);
    }
};


//getting single product
export const getProductById=async(req,res,next)=>{
    try{
        const { id }=req.params;
        //validate mongodb id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                    success:false,
                    message:"Invalid Product ID"
            });

        }
        const product = await Product.findById(id);
        if(!product)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }
        res.status(200).json({
            success:true,
            product
        });
    }
    catch(error)
    {
        next(error);
    }
}

//create product
export const createProduct=async(req,res,next)=>{
    try{
        const{name,price,description,stock}=req.body;
        //validation
        if(!name || price === undefined || !description || stock === undefined )
        {
            return res.status(400).json({
                success:false,
                message:"Name,price,description and stock are required"
            });
        }

        const product=await Product.create({ name,price,description,stock });
        res.status(201).json({
            success:true,
            message:"Product Created Successfully",
            product
        })
    }
    catch(error)
    {
        next(error);
    }
}


//upddate product using id
export const updateProduct=async(req,res,next)=>{
    try{
        const { id }=req.params;
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({
                success:false,
                message:"Invalid Product ID"
            });
        }
        const product=await Product.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        if(!product)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Product updated Successfully",
            product
        })

    }
    catch(error)
    {
        next(error);
    }
}


//delete product by id

export const deleteProduct=async(req,res,next)=>{
    try{
        const { id }=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({
            success:false,
            message:"Invalid Product ID"
        });
    }

    const product=await Product.findByIdAndDelete(id);

    if(!product)
    {
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully...."
    });
    }
    catch(error)
    {
        next(error);
    }
    
}
