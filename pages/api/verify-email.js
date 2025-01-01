import mongoose from 'mongoose';
const User = require('../../Models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const { token } = req.query;
    console.log('token.....',token);
    if (!token) {
        return res.status(400).json({ message: 'Invalid or missing token' });
      }

      try {
        const {email}= jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({ email });

        if (!user || user.isVerified) {
          return res.status(400).json({ message: 'Invalid or already verified' });
        }
    
        user.isVerified = true;
        await user.save();
    
        res.status(200).json({ message: 'Email verified successfully!' });
    
      } catch (error) {
        res.status(500).json({ message: 'Verification failed. Try again.' });
      }
}