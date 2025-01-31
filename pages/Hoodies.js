
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
const Hoodies = () => {
  const router = useRouter();
  const accessProduct = async () => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
          console.log('access resource function work ........');
            const res = await fetch('http://localhost:3000/api/subscriberAuth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ slug:'rrrrrrrrrrrrr' })
            });

            console.log('res ',res);

            if (res.ok) {
                
                router.push(`/Tshirts`);
            }
             else {
                
                router.push('/Subscription');
            }
        } catch (error) {
            console.error('Error during API call:', error);
          
        }
    } else {
       
        router.push('/Subscription');
    }
};

  return (
   
<section className="text-gray-600 body-font bg-gray-50">
<div className="container mx-auto px-5 md:px-10 lg:px-32 py-12">
       
        <div className="flex flex-wrap justify-center -m-4">
     
          {[...Array(8)].map((_, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer group">
              <Link href={"/Product/Hoodies"}>
                <div className="block relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img
                    alt="ecommerce"
                    className="w-full h-full object-cover object-center"
                    src="https://m.media-amazon.com/images/I/9112xNSIlqL._AC_SX569_.jpg"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">
                  Hoodies
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium hover:text-purple-600 transition-colors duration-200">
                  Ecommerce Hoodie
                </h2>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-semibold text-gray-900">$18.00</p>
                  <p className="text-sm text-gray-600">XS, S, M, L, XL, XXL</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
   
 
      );
    };
    
   

export default Hoodies