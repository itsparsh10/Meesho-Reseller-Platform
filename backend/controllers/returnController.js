import {Return} from "../models/return.js";
export const createReturn=async(req,res)=>{
    try{
        const newReturn=new Return(req.body);
        await newReturn.save();
        res.status(201).json({
            success:true,
            message:"Return created successfully",
            newReturn
        });
    } 
    catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to create return",
            error:error.message
        });
    }
};
export const getAllReturns=async(req,res)=>{
    try{
        const returns=await Return.find().sort({returnDate:-1});
        res.status(200).json({
            success:true,
            returns
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to fetch returns",
            error:error.message
        });
    }
};
