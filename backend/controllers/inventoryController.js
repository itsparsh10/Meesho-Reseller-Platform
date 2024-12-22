import Inventory from "../models/inventory.js";
export const addProduct=async (req, res)=>{
    try {
        const product=new Inventory(req.body);
        await product.save();
        res.status(201).json({
            success:true,
            message:"Product added successfully",
            product
        });
    }catch(error) {
        res.status(500).json({
            success:false,
            message:"Failed to add product",
            error: error.message
        });
    }
};
export const getAllProducts=async(req,res)=>{
    try{
        const{sort='productName',order= 'asc' }=req.query;
        const sortQuery={[sort]:order=== 'asc' ? 1 : -1 };
        
        const products=await Inventory.find()
            .sort(sortQuery)
            .select('-__v');
            
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to fetch products",
            error:error.message
        });
    }
}
export const updateQuantity=async(req,res)=>{
    try {
        const{id}=req.params;
        const{quantity}=req.body;
        
        const product=await Inventory.findById(id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        product.quantity = quantity;
        if(quantity===0) {
            product.status ='Out of Stock';
        } 
        else if(quantity<10) {
            product.status='Low Stock';
        } 
        else{
            product.status='In Stock';
        }

        await product.save();
        res.status(200).json({
            success:true,
            message:"Quantity updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to update quantity",
            error: error.message
        });
    }
};
export const deleteProduct=async(req,res)=>{
    try{
        const{id}=req.params;
        const product=await Inventory.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to delete product",
            error:error.message
        });
    }
};
