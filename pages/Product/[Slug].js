import { useState, useRef } from "react";
import { GetServerSideProps } from "next";
import React from "react";
import { useRouter } from "next/router";
import mongoose, { Mongoose } from "mongoose";
const Product = require("../../Models/Product");
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addCart } from "../Store/cartSlice";



const Post = ({ cart, addtoCart, buyNow, removetoCart, subtotal, data }) => {
  
  const disaptch = useDispatch();
  const { product, colorSizeSlug } = data;
  console.log("data", data);
  console.log("product", product);
  const router = useRouter();
  const { Slug } = router.query;
  const [pin, setPin] = useState("");
  const [serviceAvailability, setServiceAvailability] = useState(null);
  const [color, setColor] = useState(product?.color);
  const [size, setSize] = useState(product?.size);
  console.log("size..........", size);

  const RefreshVaraint = (newcolor, newsize) => {
    console.log("hello........");
    console.log("new color.......", newcolor);
    console.log("new size........", newsize);
    console.log("slug", colorSizeSlug[newcolor][newsize]);
    console.log("slug", colorSizeSlug[newcolor][newsize]["slug"]);
    setSize(newsize);
    setColor(newcolor);
    const url = `http://localhost:3000/Product/${colorSizeSlug[newcolor][newsize]["slug"]}`;
    console.log("url......", url);
    router.push(`/Product/${colorSizeSlug[newcolor][newsize]["slug"]}`);
  };
  const addtoCartt = ()=>{
        //  addtoCart(Slug,1,product.price,product.title,product.color,product.size);
         disaptch(addCart({
            itemCode:Slug,
            qty:1,
            price:product.price,
            title:product.title,
            color:product.color,
            size:product.size
         }))
    }
  console.log("color........", color);
  console.log("size.......", size);


  return (
    <>
    
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-14 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-10 object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.color}/{product.size})
              </h1>
              
              <div className="flex my-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
               
              </div>

              <h1 className="font-semibold text-black text-xl">${product.price}</h1>
              <p className="leading-relaxed pt-4">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. sed ut perspic atis unde omnis iste natus.</p>
             <div>
             <h1 className="mr-3 mt-3 text-black font-semibold text-xl">Color:</h1>
             <div className="flex my-4 mr-6">
  {['red', 'yellow', 'blue', 'green', 'black', 'white', 'grey', 'purple', 'orange'].map((colorOption) => (
    <button
      key={colorOption}
      onClick={() => {
        // Check if the selected size is available for the current color
        if (colorSizeSlug[colorOption] && colorSizeSlug[colorOption][size]) {
          RefreshVaraint(colorOption, size);
        }
      }}
      className={`border-2 ml-1 rounded-full w-6 h-6 focus:outline-none ${
        color === colorOption ? "border-black" : "border-gray-300"
      } ${!colorSizeSlug[colorOption] || !colorSizeSlug[colorOption][size] ? "opacity-50 cursor-not-allowed line-through " : ""}`}
      style={{ backgroundColor: colorOption }}
      disabled={!colorSizeSlug[colorOption] || !colorSizeSlug[colorOption][size]} // Disable button if not available
    ></button>
  ))}
</div>
             </div>
           

              <h1 className="mr-3 mt-3 text-black font-semibold text-xl">Size:</h1>
              
<div className="flex gap-x-6 items-center my-4">
  {["L", "XL", "M", "S", "XS"].map((sizeOption) => (
    <label key={sizeOption} className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="size"
        value={sizeOption}
        checked={size === sizeOption}
        onChange={() => {
          if (colorSizeSlug[color][sizeOption]) {
            RefreshVaraint(color, sizeOption);
          }
        }}
        className="hidden peer"
      />
      <div className={`w-2 h-2 border border-gray-400 rounded-full flex items-center justify-center peer-checked:border-red-500 ${!colorSizeSlug[color][sizeOption] ? "opacity-50 cursor-not-allowed" : ""}`}>
        <div className="w-2 h-2 bg-red-500 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
      </div>
      <span className={`ml-2 text-gray-700 text-sm ${!colorSizeSlug[color][sizeOption] ? "line-through" : ""}`}>
        {sizeOption}
      </span>
    </label>
  ))}
</div>


             
              <div className="flex mt-4">
               
                <button
                  onClick={() => {
                    buyNow(Slug, 1, product.price, product.title, color, size);
                  }}
                  className="flex   text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  className="flex ml-2 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                  onClick={() => {
                    
                    addtoCartt();
                  }}
                >
                  Add to cart
                </button>
             
              </div>

              <p className="mt-4 text-gray-500">category : {product.category.name}</p>
              <div className="flex mt-4">
  <span className="flex items-center py-2 space-x-4">
    <h1 className="text-black text-xl font-semibold">Follow Us:</h1>
    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200 mx-2">
      <svg
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-5 h-5"
        viewBox="0 0 24 24"
      >
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
      </svg>
    </a>
    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200 mx-2">
      <svg
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-5 h-5"
        viewBox="0 0 24 24"
      >
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
      </svg>
    </a>
    <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200 mx-2">
      <svg
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-5 h-5"
        viewBox="0 0 24 24"
      >
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
      </svg>
    </a>
  </span>
</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export async function getServerSideProps(context) {
  const { Slug } = context.params;
  console.log("Slug:", Slug);
  const response = await fetch(
    `http://localhost:3000/api/getSlug?Slug=${Slug}`
  );
  const data = await response.json();
  console.log("response");

  return {
    props: {
      data,
    },
  };
}

export default Post;
