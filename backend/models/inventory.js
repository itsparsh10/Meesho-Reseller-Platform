import mongoose from "mongoose";
const inventorySchema=new mongoose.Schema({
    productName: {
        type:"string",
        required:true,
        description:"The name of the product"
      },
      category:{
        type:"string",
        required:true,
        description:"The category this product belongs to"
      },
      price:{
        type:"number",
        required:true,
        description:"The price of the product in the chosen currency"
      },
      quantity:{
        type:"number",
        required:true,
        description:"The available quantity of the product"
      },
      description:{
        type:"string",
        required:false,
        description:"A brief description of the product"
      },
      brand:{
        type:"string",
        required:false,
        description:"The brand of the product"
      },
      image:{
        type:"string",
        required:false,
        description:"URL or path to the product's image"
      }
}, 
{timestamps:true });
const Inventory=mongoose.model("Inventory",inventorySchema);
export default Inventory;
