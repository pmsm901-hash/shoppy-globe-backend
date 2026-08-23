import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getCart,addToCart,updateCart,removeFromCart } from "../controllers/cartController.js";

const router=express.Router();

//protect from all cart routes

router.use(authMiddleware);

//get cart items
router.get("/",getCart);

//adding items in cart
router.post("/",addToCart);

//update cart item by id
router.put("/:id",updateCart);

//delete cart item by id
router.delete("/:id",removeFromCart);

export default router;