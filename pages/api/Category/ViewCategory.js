import Category from "@/Models/Category";

export default async function handler(req,res) {
    if(req.method==='GET'){
           try {
             const Categories = await Category.find();
             return res.status(200).json({'Categories':Categories})
           } catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).json({ success: false, message: "Server error" });
           }
    }
    else {
        return res.status(405).json({message:'This method is not allowed'})
    }
  
}