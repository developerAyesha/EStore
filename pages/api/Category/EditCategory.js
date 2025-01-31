import mongoose from "mongoose";
import Product from "@/Models/Product";
import Category from "@/Models/Category";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {

            const { name, id } = req.body;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ success: false, message: "Invalid category ID" });
            }

          
            const updatedCategory = await Category.findByIdAndUpdate(
                 id,
                { name },
                { new: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ success: false, message: "Category not found" });
            }

           
            await Product.updateMany(
                { category: id },
                { $set: { Category: name } } 
            );
               
            res.status(200).json({ success: true, data: updatedCategory });
        } catch (error) {
            console.error("Error updating category:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
