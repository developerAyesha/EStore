import { useState, useEffect } from "react";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';

import { store, persistor } from "./Store/store";  
import { PersistGate } from "redux-persist/integration/react";  
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [cart, setCart] = useState({});
  const [tempCart, setTempCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [user, setUser] = useState({});
  const [key, setKey] = useState();
  const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
    }
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, []);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    Object.keys(myCart).forEach((key) => {
      subt += myCart[key].price * myCart[key].qty;
    });
    setSubtotal(subt);
  };

 
  const buyNow = (itemCode, quantity, price, name, color, size) => {
    const newCart = { itemCode, quantity, price, name, color, size };
    setTempCart(newCart);
    toast.success("Proceeding to Checkout!");
    router.push("/Checkout");
  };
   const clearTempCart = ()=>{
    setTempCart({});
   }

 

  return (
      <>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Navbar
        key={key}
        user={user}
        cart={cart}
        clearTempCart={clearTempCart}
        subtotal={subtotal}
      
      />
      <Component
        cart={cart}
        tempCart={tempCart}
      
        subtotal={subtotal}
        buyNow={buyNow}
        clearTempCart={clearTempCart}
        {...pageProps}
      />
      <Footer />
      <ToastContainer />
      </PersistGate>
      </Provider>
      </>
  );
}

