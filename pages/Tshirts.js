import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {data && Object.keys(data).length > 0 ? (
            Object.keys(data).map((product, index) => (
              <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg">
                <Link href={`/Product/${data[product].slug}`} className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="w-full h-full block"
                    src={product.image || 'https://m.media-amazon.com/images/I/71m7BI64B8L._AC_SX679_.jpg'}
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{data[product].category}</h3>
                  <h1 className="text-xs tracking-widest title-font font-bold text-black mb-1">{data[product].title}</h1>
                  <p className="mt-1">${data[product].price}</p>
                  <div className='mt-1'>  
                    {data[product].size.includes('XS') && <span className='border border-gray-500 px-1.5 mx-1'>XS</span>}
                    {data[product].size.includes('XL') && <span className='border border-gray-500 px-1.5 mx-1'>XL</span>} 
                    {data[product].size.includes('L') && <span className='border border-gray-500 px-1.5 mx-1'>L</span>} 
                    {data[product].size.includes('XXL') && <span className='border border-gray-500 px-1.5 mx-1'>XXL</span>} 
                    {data[product].size.includes('S') && <span className='border border-gray-500 px-1.5 mx-1'>S</span>} 
                    {data[product].size.includes('M') && <span className='border border-gray-500 px-1.5 mx-1'>M</span>} 
                   
                  </div>
                  <div className='mt-1'>
                    {data[product].color.includes('red') && <button className="border-2 border-black-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {data[product].color.includes('green') && <button className="border-2 border-black-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {data[product].color.includes('yellow') && <button className="border-2 border-black-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {data[product].color.includes('blue') && <button className="border-2 border-black-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {data[product].color.includes('white') && <button className="border-2 border-black-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                    {data[product].color.includes('black') && <button className="border-2 border-black-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    {data[product].color.includes('purple') && <button className="border-2 border-black-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                   
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
  );
};

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/getProducts?Category=Tshirt');
  const data = await response.json();
  console.log("data in tshirt", data);

  return {
    props: {
      data: data.product || {}, 
    },
  };
}

export default Tshirts;
