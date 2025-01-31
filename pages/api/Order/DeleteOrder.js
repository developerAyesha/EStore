import { DbConnection } from "../DB";
import Order from "@/Models/Order";

export default async function handler(req, res) {
    console.log('req body', req.query);
    const { id } = req.query;

    try {
        await DbConnection();
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Database connection failed" });
    }

    if (req.method === 'DELETE') {
        try {
            const result = await Order.deleteOne({ _id: id });
            console.log('response', result);
            return res.status(200).json({ message: "Order is deleted successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Failed to delete order" });
        }
    } else {
        return res.status(405).json({ message: "This method is not allowed" });
    }
}
