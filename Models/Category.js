const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    }
},
{
    timestamps:true
});

module.exports =  mongoose.models.Category ||  mongoose.model('Category',CategorySchema);