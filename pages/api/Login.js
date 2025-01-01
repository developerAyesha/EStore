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

  try {
   if(req.method=='POST'){
    console.log(req.body);
    const {email,password} = req.body;
    console.log('email..',email);
    console.log('password..',password);
  
    const user = await User.findOne({email:req.body.email});
    console.log('user is ',user);
    if(user){
       const hashPassword = await bcrypt.compare(req.body.password,user.password);
       console.log('compare hash',hashPassword)
      if(user.email==req.body.email && hashPassword==true){
        var token = jwt.sign({email}, 'shhhhh',{expiresIn:'2d'});

        return  res.status(200).json({success:true,message:"User Login succesfully",token})
      }
      else {
        return  res.status(400).json({success:true,message:"Email and Password not match"})
      }
    }
    else {
        return res.status(400).json({message:'This User is not exixt'})
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

