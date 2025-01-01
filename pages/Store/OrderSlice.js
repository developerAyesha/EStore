import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderDetails: {
      personalInfo: {},
      cartItems: {},
      paymentMethod: '',
    },
  };
const OrderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        setOrderDetails: (state, action) => {
            console.log('action.payload',action.payload);
            state.orderDetails = action.payload;
          },
          clearOrder: (state) => {
            state.orderDetails = {
              personalInfo: {},
              cartItems: [],
              paymentMethod: '',
            };
          }
    }
})
export const {setOrderDetails,clearOrder}=OrderSlice.actions

export default OrderSlice.reducer