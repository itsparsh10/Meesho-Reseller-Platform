import express from "express";
import {createReturn,getAllReturns} from "../controllers/returnController.js";
const router=express.Router();
// Create a new return
router.post("/",createReturn);
// Get all returns
router.get("/",getAllReturns);
export default router;
