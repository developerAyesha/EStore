import mongoose from "mongoose";
import Category from "@/Models/Category";
import Product from "@/Models/Product";
export default async function handler(req,res){
 console.log(req.body);
 const {id} = req.body;

 if(req.method==='DELETE'){
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        const deletedCategory = await Category.findByIdAndDelete(id);

        if(!deletedCategory){
            return res.status(404).json({message:"Category not found"})
        }

        await Product.deleteMany({ category: id })

        return res.status(200).json({success:true,message: "Category deleted successfully"})

    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
 }
 else {

    res.status(405).json({ success: false, message: "Method not allowed" });
 }

}