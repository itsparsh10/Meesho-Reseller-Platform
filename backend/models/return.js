import mongoose from "mongoose"
const returnSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    orderNumber:{
        type:String,
        required:true
    },
    returnDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:"Returned"
    },
    price:{
        type:String,
        required:true
    }
}, 
{timestamps:true});
export const Return=mongoose.model("Return",returnSchema);
