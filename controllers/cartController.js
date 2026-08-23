import mongoose from "mongoose";
import Cart from "../models/Cart.js"
import Product from "../models/Product.js";

//get cart Items
export const getCart = async(req,res,next)=>{
    try{
        const cartItems=await Cart.find({
            user:req.user.userId
        }).populate("product");

        res.status(200).json({
            success:true,
            count:cartItems.length,
            cartItems
        });
    }
    catch(error)
    {
        next(error);
    }
}

//adding product to cart

export const addToCart=async(req,res,next)=>{
    try{
        const{productId,quantity}=req.body;

        //validate input
        if(!productId || !quantity)
        {
            return res.status(400).json({
                success:false,
                message:"Product ID & Quantity  are required"
            })
        }

        //validate objectId
        if(!mongoose.Types.ObjectId.isValid(productId))
        {
            return res.status(400).json({
                success:false,
                message:"Invalid Product ID"
            });
        }

        //validate quantity
        if(quantity < 1)
        {
            return res.status(400).json({
                success:false,
                message:"Quantity at least must be 1"
            });
        }

        //check product exists
        const product=await Product.findById(productId);
        if(!product)
        {
            return res.status(404).json({
                success:false,
                message:"Product Not Found"
            });
        }

        //check stock
        if(quantity > product.stock)
        {
            return res.status(400).json({
                success:false,
                message:"Requested Quantity is greater than available stock"
            });
        }


        //check if already in cart
        const existingCartItems=await Cart.findOne({
            user:req.user.userId,
            product:productId
        })

        if(existingCartItems)
        {
            const newQuantity=existingCartItems.quantity+quantity;
            if(newQuantity > product.stock)
            {
                return res.status(400).json({
                    success:false,
                    message:"Quantity exceeds available stock"
                });
            }
            existingCartItems.quantity=newQuantity;

            await existingCartItems.save();
            return res.status(200).json({
                success:true,
                message:"Cart Quantity updated",
                cartItem:existingCartItems
            });

        }

        //create cart item

        const cartItem=await Cart.create({
            user:req.user.userId,
            product:productId,
            quantity
        });

        res.status(201).json({
            success:true,
            message:"Product Added to cart",
            cartItem
        });
    }
    catch(error)
    {
        next(error);
    }
}


//update cart

export const updateCart=async(req,res,next)=>{
    try{
        const { id }=req.params;
        const { quantity }=req.body;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({
                success:false,
                message:"Invalid cart ID"
            });
        }
        if(!quantity || quantity < 1)
        {
            return res.status(400).json({
                success:false,
                message:"Quantity must be at least 1"
            });
        }
         //find users cart item
         const cartItem=await Cart.findOne({
            _id:id,
            user:req.user.userId

         }).populate("product");

         if(!cartItem){
            return res.status(404).json({
                success:false,
                message:"Cart Item Not Found"
            });
         }

         //check stock

         if(quantity > cartItem.product.stock)
         {
            return res.status(400).json({
                success:false,
                message:"Quantity exceeds available stock"
            });
         }
         cartItem.quantity=quantity;
         await cartItem.save();
         res.status(200).json({
            success:true,
            message:"Cart Updated Successfully...",
            cartItem
         });
        
    }
    catch(error)
    {
        next(error);
    }
    
}

//delete cart items

export const removeFromCart=async(req,res,next)=>{
    try{
        const { id }=req.params;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({
                success:false,
                message:"Invalid Cart ID"
            });
        }

        const cartItem=await Cart.findOneAndDelete({
            _id:id,
            user:req.user.userId
        });

        if(!cartItem)
        {
            return res.status(404).json({
                success:false,
                message:"Cart Item Not Found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Product Removed From cart"
        });
    }
    catch(error)
    {
        next(error);
    }
}