const mongoose =require('mongoose')  

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    isPremium: { type: Boolean, default: false }
}, { timestamps: true });

module.exports =mongoose?.models?.Product|| mongoose.model('Product', ProductSchema);
