import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { CiCirclePlus,CiCircleMinus } from "react-icons/ci";
import { IoBagCheck } from "react-icons/io5";
import { RemoveCart,addCart,clearCart } from "@/pages/Store/cartSlice";
import { useDispatch,useSelector} from "react-redux";
const Navbar = ({subtotal}) => {                        
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  console.log('cart in store',cart);
  Object.keys(cart).map((key) => {
    console.log('item....',key);
});

   const ref=useRef();
   const toggleCart = ()=>{
        if(ref.current.classList.contains('translate-x-full')){
          ref.current.classList.remove('translate-x-full')
          ref.current.classList.add('translate-x-0')
        }
        else if(!ref.current.classList.contains('translate-x-full')){
         ref.current.classList.remove('translate-x-0')
         ref.current.classList.add('translate-x-full')
        }

        
   }
  return (
    <div className="flex justify-between items-center sticky top-0 z-10  bg-white">
    <div className="logo">
      <Image src="/ecologo.png" width={100} height={30}></Image>
    </div>
    <div className="nav">
      <ul className="flex items-center gap-5 font-bold ">
        <Link href={"/Tshirts"}>
          <li>Tshirts</li>
        </Link>
        <Link href={"/Hoodies"}>
          <li>Hoodies</li>
        </Link>
        <Link href={"/Mugs"}>
          <li>Mugs</li>
        </Link>
        <Link href={"/Sticker"}>
          <li>Stickers</li>
        </Link>
      </ul>
    </div>
    <div  className="cart me-10 flex ">
  <Link href={'/Login'}><MdAccountCircle className="md:text-2xl text-xl cursor-pointer mx-2" /> </Link>  <FaCartShopping className="md:text-2xl text-xl cursor-pointer mx-2" onClick={toggleCart}/>
    </div>
      
      <div ref={ref} className=" w-[20rem] h-[100vh]  sidebar absolute top-0 right-0 bg-pink-100 py-10 px-4 transform transition-transform translate-x-full ">
        <h2 className="font-bold text-l text-center">Shopping Cart</h2>
        <span  onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2l text-pink-500"><IoIosCloseCircle /></span>
         <ol className="list-decimal font-semibold px-1">
          {/* {Object.keys(cart).length==0 && (
            <div className="my-4 font-semibold">
              Your Cart is Empty!
            </div>
          )} */}
           {cart && Object.keys(cart).map((k)=>{
            return <li key={k}>
            <div className=" item flex my-5 ">
            <div className="font-semibold w-2/3">{cart[k]?.name} ({cart[k]?.color}/{cart[k]?.size})</div> 
            <div className=" font-semibold w-1/3 flex items-center justify-center text-l "><CiCircleMinus onClick={()=>{dispatch(RemoveCart(k))}} className="cursor-pointer" /> <span className="mx-2">{cart[k].qty}</span><CiCirclePlus onClick={()=>{dispatch(addCart({itemCode:k}))}} className="cursor-pointer"/></div>
         </div>
         </li>
           })}
            
          
            

         </ol>
         <div className="flex pt-5 justify-center ">
       <Link href={'/Checkout'}>  <button className="flex  mx-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg"><IoBagCheck className="m-1"/>CheckOut</button></Link>
         <button className="flex mx-2 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg" onClick={()=>{dispatch(clearCart())}}>Clear Cart</button>
         </div>
      </div>
    </div>
  );
};

export default Navbar;
