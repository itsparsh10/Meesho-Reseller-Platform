import { Order } from "../models/order.js";
export const createOrder=async (req,res)=>{
    try{
        const order=new Order(req.body);
        await order.save();
        res.status(201).json({
            success:true,
            message:"Order created successfully",
            order
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to create order",
            error: error.message
        });
    }
};
export const getAllOrders=async(req,res)=>{
    try{
        const orders=await Order.find().sort({createdAt: -1});
        res.status(200).json({
            success:true,
            orders
        });
    } 
    catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to fetch orders",
            error:error.message
        });
    }
};
