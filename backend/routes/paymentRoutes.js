import express from "express";
import {getAllPayments,createPayment,getPaymentById} from "../controllers/paymentController.js";
const router=express.Router();
// Get all payments
router.get('/',getAllPayments);
// Create new payment
router.post('/',createPayment);
// Get payment by ID
router.get('/:id',getPaymentById);
export default router;
