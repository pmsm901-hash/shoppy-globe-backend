import express from "express";
import { getProducts,getProductById,createProduct,updateProduct,deleteProduct } from "../controllers/productController.js";

const router=express.Router();

//GET products /products
router.get("/",getProducts);

//GET Product by Id /products:id
router.get("/:id",getProductById);

//POST Creating products /products
router.post("/",createProduct);

//PUT Updating product by id /products/:id
router.put("/:id",updateProduct);

//DELETE delete product by id /products/:id
router.delete("/:id",deleteProduct);

export default router;