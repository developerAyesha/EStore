import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Tshirts = ({ data }) => {
  console.log("data in client.....", data);

 

  return (
    <section className="text-gray-600 body-font">
      <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={true}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>

<section className="text-gray-600 body-font bg-gray-50">
  <div className="container mx-auto px-5 md:px-10 lg:px-32 py-12">
    <div className="flex flex-wrap justify-center -m-4">
      {data && Object.keys(data).length > 0 ? (
        Object.keys(data).map((product, index) => (
          <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer group">
            <Link href={`/Product/${data[product].slug}`}>
              <div className="block relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  alt="ecommerce"
                  className="w-full h-full object-cover object-center"
                  src={data[product]?.img || "https://m.media-amazon.com/images/I/9112xNSIlqL._AC_SX569_.jpg"}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
            </Link>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">
                {data[product]?.category?.name || "Unknown Category"}
              </h3>
              <h2 className="text-gray-900 title-font text-lg font-medium hover:text-purple-600 transition-colors duration-200">
                {data[product]?.title}
              </h2>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-semibold text-gray-900">${data[product]?.price}</p>
              
              </div>
              {/* Colors */}
              <div>
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) =>
                    data[product]?.size.includes(size) ? (
                      <span key={size} className="border border-gray-500 px-1.5 mx-1">{size}</span>
                    ) : null
                  )}
                </div>
              <div className="mt-1">
                {["red", "green", "yellow", "blue", "white", "black", "purple",'grey'].map((color) => {
                  const colorClass = color === "white" || color === "black"
                    ? `bg-${color}`
                    : `bg-${color}-700`;

                  return data[product]?.color.includes(color) ? (
                    <button
                      key={color}
                      className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none ${colorClass}`}
                    ></button>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  </div>
</section>


    </section>
  );
};

export async function getServerSideProps() {
  const response = await axios.get('http://localhost:3000/api/getProduct?CategoryName=Tshirt');
  const data = response.data;
  console.log("data in tshirt", data);

  return {
    props: {
      data: data.product || {}, 
    },
  };
}

export default Tshirts;
