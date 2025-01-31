const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

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

  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'booked',
  },
  ShippingInfo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

module.exports = mongoose.models.OrderModel || mongoose.model('OrderModel', OrderSchema);
