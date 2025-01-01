const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  useremail: {
    type: String,
    required: true,
  },
  Products: [
    {
      slug: {
        type: String,
        required: true,
      },
      Quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'booked',
  },
}, { timestamps: true });


module.exports = mongoose.models.OrderModel || mongoose.model('OrderModel', OrderSchema);

