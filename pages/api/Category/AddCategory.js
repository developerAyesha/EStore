import Category from "@/Models/Category";
import mongoose from "mongoose";
import { DbConnection } from "../DB";

export default async function handler(req, res) {
  console.log("res body of Category .......", req.body);
  const { name } = req.body;
  try {
    await DbConnection();
    const newCategory = new Category({
      name,
    });
    const addedCategory = await newCategory.save();
    console.log("added Category ..", addedCategory);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error establishing database connection:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to connect to the database" });
  }
  try {
  } catch (error) {}
}
