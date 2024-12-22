import express from "express";
import {createOrder,getAllOrders} from "../controllers/orderController.js";
const router=express.Router();
// Create new order
router.post("/",createOrder);
// Get all orders
router.get("/",getAllOrders);

export default router;
