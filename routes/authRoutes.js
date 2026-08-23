import express from "express";
import {register,login} from "../controllers/authController.js";
const router=express.Router();

//post /register
router.post("/register",register);

//post /login
router.post("/login",login);

export default router;