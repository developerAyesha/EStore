import {useState,useEffect} from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { CiCirclePlus,CiCircleMinus } from "react-icons/ci";
import { IoBagCheck } from "react-icons/io5";
import Link from 'next/link';

import { setOrderDetails } from './Store/OrderSlice';
import { addCart,RemoveCart,clearCart } from './Store/cartSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useRouter } from 'next/router';



const Checkout = ({subtotal,tempCart,clearTempCart}) => {
  const [total, setTotal] = useState(0); 
  let cart = useSelector((state)=>state.cart.cart);
  console.log('cart.... in checkout ',cart)
  console.log('subtotal....',subtotal);
  console.log('tempcart',tempCart)
  console.log('temp cart in checkout ......',tempCart)
  const dispatch = useDispatch();
   const router=useRouter()
   const [paymentMethod, setPaymentMethod] = useState('Cash');
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()
  

  useEffect(() => {
    let totalAmount = 0;
    if (Object.keys(cart).length > 0) {
      Object.keys(cart).forEach((key) => {
        totalAmount += cart[key].price * cart[key].qty;
      });
      setTotal(totalAmount);
    }
    else if (tempCart && Object.keys(tempCart).length>0) {
      setTotal(tempCart.price);

    }
    
  }, [cart, tempCart]);

  const onSubmit=async (data)=>{  console.log('cart.......',cart)
     console.log('data',data)
     console.log('payment method....',paymentMethod)
     let orderDetails={};
      if(Object.keys(tempCart).length>0){
          
         orderDetails = {
          personalInfo: data,
          tempCart,
          paymentMethod:paymentMethod ,
          amount:tempCart?.price,
        
         }
        
        
        console.log('cart in temp cart checkout...',cart);
        clearTempCart();
      }
      else 
      {
        
       
         orderDetails = {
          personalInfo: data,
          cartItems: cart,
          paymentMethod:paymentMethod ,
          amount:total,
         }

         dispatch(clearCart())

      }
    
     console.log('order details in check out .........',orderDetails);
     console.log('orderDeatils.....',orderDetails)
     dispatch(setOrderDetails(orderDetails));
     await fetch('http://localhost:3000/api/Order/orderEmail',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    },
    await fetch('http://localhost:3000/api/addOrder',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(orderDetails)
    })
     )
     reset();
     router.push('/Order')
     
  }
  return (
    <> 
    <div className='mx-32'>
    <h1 className='font-bold text-center text-2xl my-8 '>Checkout</h1>
    <h2 className='font-bold'>Delivery Details</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='mx-auto flex my-4'>
    <div className='px-2 w-1/2'>
    <div class="relative mb-4">
        <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
        <input type="name" {...register('name',{required:{value:true,message:'name is required'}})} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        {errors.name && errors.name.message}
      </div>
    </div>
    <div className='px-2 w-1/2'>
    <div class="relative mb-4">
        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input type="email"  {...register("email", { required:{value:true,message:"Email is required"},  pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email format',
          },} )} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
     {errors.email && errors.email.message}
      </div>
    </div>
    </div>
    <div className='px-2 w-full'>
    <div class="relative mb-4">
        <label for="address" class="leading-7 text-sm text-gray-600">Address</label>
        <textarea name='adress' {...register('address',{required:{value:true,message:'Adress is required '}})} cols={30} rows={2} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        {errors.address && errors.address.message}
      </div>
    </div>
    <div className='mx-auto flex my-4'>
    <div className='px-2 w-1/2'>
    <div class="relative mb-4">
        <label for="phone" class="leading-7 text-sm text-gray-600">phone</label>
        <input type="phone" {...register('phone',{required:{value:true,message:'phone is required '}})} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        {errors.phone && errors.phone.message}
      </div>
    </div>
    <div className='px-2 w-1/2'>
    <div class="relative mb-4">
        <label for="city" class="leading-7 text-sm text-gray-600">city</label>
        <input type="city"{...register('city',{required:{value:true,message:'city is required '}})} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        {errors.city && errors.city.message}
      </div>
    </div>
    </div>
    <div className='mx-auto flex my-4'>
    <div className='px-2 w-1/2'>
    <div class="relative mb-4">
        <label for="state" class="leading-7 text-sm text-gray-600">state</label>
        <input type="state" {...register('state',{required:{value:true,message:'state is required '}})} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        {errors.state && errors.state.message}
      </div>
    </div>
    <div className='px-2 w-1/2'>
    <div class="relative mb-4">
        <label for="pincode" class="leading-7 text-sm text-gray-600">pincode</label>
        <input type="pincode" id="pincode" {...register('pincode',{required:{value:true,message:'pincode is required '}})} name="pincode" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        {errors.pincode && errors.pincode.message}
      </div>
    </div>
    </div>
   <div class="px-2 w-1/3">      
  <div class="relative mb-4">
  <h2 className='font-bold my-2'>Select Payment Method</h2>

    <select  value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} class="w-full  leading-7 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
       
        <option  value="Cash">Cash</option>
        <option   value="Debit/Credit">Debit /  Credit Card</option>
        
    </select>
   
  </div>
</div>
   
    <h2 className='font-bold mx-2 my-1'>Review Cart Items</h2>
    <div  className="sidebar  bg-pink-100 py-10 px-4  ">
      
      
    <ol className="list-decimal font-semibold px-1">
  {Object.keys(tempCart).length > 0 ? (
    <li>
    <div className="item flex my-5">
      <div className="font-semibold w-1/4">{tempCart.name}</div>
      <div className="font-semibold w-1/4 flex items-center justify-center text-l">
        {/* <CiCircleMinus
          onClick={() => {
            removetoCart(
              tempCart.itemCode, 
              1, 
              tempCart.price, 
              tempCart.name, 
              tempCart.size, 
              tempCart.variant
            );
          }}
          className="cursor-pointer"
        /> */}
        <span className="mx-2">{tempCart.quantity}</span>
        {/* <CiCirclePlus
          onClick={() => {
            addtoCart(
              tempCart.itemCode, 
              1, 
              tempCart.price, 
              tempCart.name, 
              tempCart.size, 
              tempCart.variant
            );
          }}
          className="cursor-pointer"
        /> */}
      </div>
    </div>
  </li>
  ) : 
    Object.keys(cart).length === 0 ? (
      <div className="my-4 font-semibold">
        Your Cart is Empty!
      </div>
    ):(Object.keys(cart).map((k) => {
      return (
        <>
        <li key={k}>
          <div className="item flex my-5">
            <div className="font-semibold w-1/4">{cart[k].name}</div>
            <div className="font-semibold w-1/4 flex items-center justify-center text-l">
              <CiCircleMinus
                onClick={() => {
                  dispatch(RemoveCart(k))
                  // removetoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant);
                }}
                className="cursor-pointer"
              />
              <span className="mx-2">{cart[k].qty}</span>
              <CiCirclePlus
                onClick={() => {
                  dispatch(addCart({itemCode:k}))
                  // addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant);
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </li>

        </>
      );
    }))}
   
  
</ol>

        
      </div>

      <h1 className='font-bold my-2 '>SubTotal: ₹{total}</h1>
      
      <div className='flex justify-center items-center'>
           <input type="submit" value={'Confirm Order '} className='px-6 py-1.5 rounded-md bg-pink-600 text-white  inline my-3 hover:cursor-pointer' />
        </div>
      </form>
    
     
    </div>
    
    </>
  )
  
}

export default Checkout