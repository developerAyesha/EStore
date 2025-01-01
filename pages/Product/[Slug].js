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

  const checkServiceAvailability = async () => {
    try {
      let pins = await fetch("http://localhost:3000/api/pincode");
      let pinjson = await pins.json();

      if (pinjson.includes(Number(pin))) {
        setServiceAvailability(true);
      } else {
        setServiceAvailability(false);
      }
    } catch (error) {
      console.error("Error fetching pincodes: ", error);
    }
  };

  const handlePinstate = (e) => {
    const pinn = e.target.value;
    setPin(pinn);
  };
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-14 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-20 object-cover object-top rounded"
              src="https://m.media-amazon.com/images/I/71m7BI64B8L._AC_SX679_.jpg"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                EStore
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.color}/{product.size})
              </h1>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <div className="flex mb-4">
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
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(colorSizeSlug).includes("red") &&
                    Object.keys(colorSizeSlug["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          RefreshVaraint("red", size);
                        }}
                        className={`border-2 border-gray-300 ml-1 bg-red-800 rounded-full w-6 h-6 focus:outline-none></button>${
                          color == "red" ? "border-black" : "border-grey-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(colorSizeSlug).includes("green") &&
                    Object.keys(colorSizeSlug["green"]).includes(size) && (
                      <button
                        onClick={() => {
                          RefreshVaraint("black", size);
                        }}
                        className={`border-2 border-gray-300 ml-1 bg-green-800 rounded-full w-6 h-6 focus:outline-none></button>${
                          color == "red" ? "border-black" : "border-grey-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(colorSizeSlug).includes("purple") &&
                    Object.keys(colorSizeSlug["purple"]).includes(size) && (
                      <button
                        onClick={() => {
                          RefreshVaraint("purple", size);
                        }}
                        className={`border-2 border-gray-300 ml-1 bg-purple-800 rounded-full w-6 h-6 focus:outline-none></button>${
                          color == "red" ? "border-black" : "border-grey-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(colorSizeSlug).includes("blue") &&
                    Object.keys(colorSizeSlug["blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          RefreshVaraint("blue", size);
                        }}
                        className={`border-2 border-gray-300 ml-1 bg-blue-800 rounded-full w-6 h-6 focus:outline-none></button>${
                          color == "red" ? "border-black" : "border-grey-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(colorSizeSlug).includes("black") &&
                    Object.keys(colorSizeSlug["black"]).includes(size) && (
                      <button
                        onClick={() => {
                          RefreshVaraint("black", size);
                        }}
                        className={`border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none></button>${
                          color == "red" ? "border-black" : "border-grey-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(colorSizeSlug).includes("white") &&
                    Object.keys(colorSizeSlug["white"]).includes(size) && (
                      <button
                        onClick={() => {
                          RefreshVaraint("white", size);
                        }}
                        className={`border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none></button>${
                          color == "red" ? "border-black" : "border-grey-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(colorSizeSlug).includes("yellow") &&
                    Object.keys(colorSizeSlug["yellow"]).includes(size) && (
                      <button
                        onClick={() => {
                          RefreshVaraint("yellow", size);
                        }}
                        className={`border-2 border-gray-300 ml-1 bg-yellow-800 rounded-full w-6 h-6 focus:outline-none></button>${
                          color == "red" ? "border-black" : "border-grey-300"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        RefreshVaraint(color, e.target.value);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                    >
                      <option>select size</option>
                      {Object.keys(colorSizeSlug[color]).includes("S") && (
                        <option value="S">S</option>
                      )}
                      {Object.keys(colorSizeSlug[color]).includes("M") && (
                        <option value="M">M</option>
                      )}
                      {Object.keys(colorSizeSlug[color]).includes("L") && (
                        <option value="L">L</option>
                      )}
                      {Object.keys(colorSizeSlug[color]).includes("XL") && (
                        <option value="XL">XL</option>
                      )}
                      {Object.keys(colorSizeSlug[color]).includes("XXL") && (
                        <option value="XXL">XXL</option>
                      )}
                    </select>

                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
                <button
                  onClick={() => {
                    buyNow(Slug, 1, product.price, product.title, color, size);
                  }}
                  className="flex ml-8 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
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
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button> */}
              </div>
              {/* <div className="flex mt-6 space-x-2 text-sm">
                <input
                  className="px-2 border-2 border-pink-200 rounded-sm"
                  onChange={handlePinstate}
                  placeholder="Enter your Pincode"
                  type="text"
                />
                <button
                  onClick={checkServiceAvailability}
                  className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Check
                </button>
              </div>

              {serviceAvailability === false && (
                <div className="text-red-700 text-sm mt-4">
                  Sorry! We do not deliver to this pin code.
                </div>
              )} */}

              {/* {serviceAvailability === true && (
                <div className="text-green-700 text-sm mt-4">
                  Yay! Pincode is serviceable.
                </div>
              )} */}
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
