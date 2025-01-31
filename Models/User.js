const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin :{
        type:String,
        
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    subscriptionStatus: {
         type: String,
         default: 'free'
         }
     
   
    

},{timestamps:true})
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
