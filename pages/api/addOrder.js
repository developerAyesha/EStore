import mongoose from 'mongoose';
const OrderModel = require('../../Models/Order'); 

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
  console.log('req body.....', req.body);
  const { personalInfo, cartItems, paymentMethod, tempCart } = req.body;
  const { name, email, address, phone, city, state, pincode } = personalInfo;
  let { amount } = req.body;

  console.log('Personal details ,,,,,,', personalInfo, cartItems, paymentMethod, amount);
  console.log('Email and address .....', email, address);

  console.log('Handler started');

  try {
    await DbConnection();
  } catch (error) {
    console.error('Error establishing database connection:', error);
    return res.status(500).json({ success: false, message: 'Failed to connect to the database' });
  }

  console.log('Database connection established');

  try {
    let products = [];

    // Handle tempCart or cartItems
    if (tempCart && Object.keys(tempCart).length > 0) {
      // Handle tempCart data
      products.push({
        slug: tempCart.itemCode,
        Quantity: tempCart.quantity // Ensure you are using the correct field name
      });
    } else if (cartItems && typeof cartItems === 'object' && Object.keys(cartItems).length > 0) {
      // Handle cartItems data
      Object.entries(cartItems).forEach(([key, item]) => {
        products.push({
          slug: key,
          Quantity: item.qty // Ensure you are using the correct field name for cartItems
        });
      });
    } else {
      console.log('No cart or tempCart data provided');
      return res.status(400).json({ success: false, message: 'No cart data provided' });
    }

    console.log('Products....', products);

    let useremail = email;
    
    // Create the new order object
    const newOrder = new OrderModel({
  
      Products: products,
      amount,
      ShippingInfo: {
        name,
        email,
        address,
        phone,
        city,
        state,
        pincode
      },
      // If you want to store payment method as well
    });

    console.log('Order object created:', newOrder);

    // Save the order to the database
    const savedOrder = await newOrder.save();
    console.log('Order saved successfully:', savedOrder);

    return res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
