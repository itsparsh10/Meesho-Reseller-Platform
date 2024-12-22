import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    customerAddress:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    status:{
        type:String,
        default:"New Order"
    },
    date:{
        type:Date,
        default:Date.now
    },
    modeOfPayment:{
        type:String,
        required:true
    }
},
{timestamps:true});

export const Order=mongoose.model("Order",orderSchema);
