import mongoose from 'mongoose';
const paymentSchema=new mongoose.Schema({
  id:{
    type:Number,
    required:true,
    unique:true
  },
  customerName:{
    type:String,
    required:true
  },
  date:{
    type:String, 
    required:true
  },
  amount:{
    type:String, 
    required:true
  },
  status:{
    type:String,
    required:true,
    enum:['Payment Received', 'Pending', 'Failed'],
    default:'Pending'
  },
  orderId:{
    type:String,
    required:true,
    unique:true
  },
  product:{
    type:String,
    required:true
  },
  shippingAddress:{
    type:String,
    required:true
  },
  paymentMethod:{
    type:String,
    required:true,
    enum:['UPI', 'Credit Card', 'Debit Card', 'Net Banking']
  }
});
export default mongoose.model('Payment',paymentSchema);
