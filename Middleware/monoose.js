// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');

// const connectDb = async (handler)=>{
//     if(mongoose.connection[0].readystate){
//        return  handler(req,res)
//     }
//     await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
//     return  handler(req,res)
// }
// export default connectDb;