import { DbConnection } from './DB';
const User=require('../../Models/User')



export default async function handler(req,res){

    console.log('Handler started');
  
    try {
      await DbConnection();
    } catch (error) {
      console.error('Error establishing database connection:', error);
      return res.status(500).json({ success: false, message: 'Failed to connect to the database' });
    }
  
    console.log('Database connection established');
  
    try {
     if(req.method=='GET'){
      console.log(req.body);
      const {email}=req.query;
      console.log('email..',email);
    
    
      const user = await User.findOne({email});
      console.log('user is ',user);
      if(user){
        return res.status(200).json({message:'This User is login successfully'})
       
      }
      else {
          return res.status(404).json({message:'This User is not exixt'})
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