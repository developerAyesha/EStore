import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: {}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      console.log("dispatch in action .........");
      console.log("payload.....", action.payload);

      const cart = action.payload;

    
      if (state.cart[cart.itemCode]) {
        state.cart[cart.itemCode].qty += 1; 
      } else {
        state.cart[cart.itemCode] = {
          qty: cart.qty,
          price: cart.price,
          name: cart.title,
          size: cart.size,
          color: cart.color
        }; 
        toast.success(' Product is  added to the cart!');
      }
      
      console.log("cart in redux state.....", JSON.stringify(state.cart));

    },
    RemoveCart:(state,action)=>{
        const item = action.payload;
        console.log('item',item);
        
        state.cart[item].qty-=1
        if (state.cart[item].qty <= 0) delete state.cart[item];
    },
    clearCart:(state)=>{
        state.cart={}
        toast.success('cart is empty now')
    }
  }
});

export const { addCart,RemoveCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
