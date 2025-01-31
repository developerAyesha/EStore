import mongoose from 'mongoose';
const User = require('../../Models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { DbConnection } from './DB';

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
    console.log(req.body);
    const {email,password} = req.body;
    console.log('email..',email);
    console.log('password..',password);
  
    const user = await User.findOne({email:req.body.email});
    console.log('user is ',user);
    const {subscriptionStatus} =user;
    if(user){
       const hashPassword = await bcrypt.compare(req.body.password,user.password);
       console.log('compare hash',hashPassword)
      if(user.email==req.body.email && hashPassword==true){
        var token = jwt.sign({email,subscriptionStatus}, 'shhhhh',{expiresIn:'2d'});
        res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=172800`);
        return  res.status(200).json({success:true,message:"User Login succesfully",token})
      }
      else {
        return  res.status(500).json({success:false,message:"Email and Password not match"})
      }
    }
    else {
        return res.status(400).json({message:'This User is not exist'})
    }
   
  

}
   else {
    return res.status(400).json({ success: false, message: 'this method is not allowed ' })
   }
   
  } catch (error) {
    console.error('Error retrieving login User:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

