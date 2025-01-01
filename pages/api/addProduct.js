import mongoose from 'mongoose';
const Product = require('../../Models/Product'); 

const DbConnection = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to the database');
    return;
  }
  try {
    await mongoose.connect('mongodb://localhost:27017/CodesWeare', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw new Error('Database connection error');
  }
};

export default async function handler(req, res) {
  console.log('Handler started');

  try {
    await DbConnection();
  } catch (error) {
    console.error('Error establishing database connection:', error);
    return res.status(500).json({ success: false, message: 'Failed to connect to the database' });
  }

  console.log('Database connection established');

  try {
   if(req.method=='POST'){
    for(let i=0;i<req.body.length;i++){
    let p =new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        price: req.body[i].price,
        img: req.body[i].img,
        category: req.body[i].category,
        color: req.body[i].color,
        size: req.body[i].size,
        availableQuantity:req.body[i].availableQuantity
    })
    await p.save();
   }
   return res.status(200).json({success:true,message:"product are added succesfully"})

}
   else {
    return res.status(400).json({ success: false, message: 'this method is not allowed ' })
   }
   
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
