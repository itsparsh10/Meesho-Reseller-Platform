import Payment from '../models/payment.js';
export const getAllPayments = async (req, res) => {
  try {
    const payments=await Payment.find().sort({date: -1});
    res.status(200).json({ success:true,payments});
  } catch (error) 
  {
    res.status(500).json({success:false,message:error.message });
  }
};
export const createPayment=async(req,res)=>{
  try{
    const payment=new Payment(req.body);
    await payment.save();
    res.status(201).json({ success:true,payment});
  } catch (error) {
    res.status(400).json({ success:false,message:error.message});
  }
};
export const getPaymentById=async(req,res)=>{
  try{
    const payment=await Payment.findById(req.params.id);
    if(!payment){
      return res.status(404).json({success:false,message:'Payment not found'});
    }
    res.status(200).json({success:true,payment });
  }catch(error){
    res.status(500).json({success:false,message:error.message});
  }
};