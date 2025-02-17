import mongoose from 'mongoose';
const OrderModel = require('../../Models/Order'); // This will now safely load the model

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
    const order = await OrderModel.find();
    console.log('orders:', order);

    return res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
