import express from "express";
import { 
    addProduct, 
    getAllProducts, 
    updateQuantity, 
    deleteProduct 
} 
from "../controllers/inventoryController.js";
const router=express.Router();
// Add new product
router.post("/add",addProduct);
// Get all products with optional sorting
router.get("/all",getAllProducts);
// Update product quantity
router.patch("/update/:id",updateQuantity);
// Delete product
router.delete("/delete/:id",deleteProduct);
export default router;
