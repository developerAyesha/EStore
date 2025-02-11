import React from 'react'

const Footer = () => {
  return (
    <div className="footer my-24">
      <div className="container  flex  flex-wrap max-w-[1400px] mx-auto px-4 static ">
      <div className="footer1 lg:w-1/2  px-5  ">
             <div className="inner-footer flex flex-wrap ">
                <div className="lg:w-1/3">
                   <h1 className="font-bold text-left text-4xl">EStore</h1>
                </div>
                <div className="lg:w-1/3">
                  <div>
                    <h1 className="font-bold text-xl mb-5">Category</h1>
                    <ul>
                     <li className="text-gray-500  my-2">Men</li>
                     <li className="text-gray-500  my-2">Women</li>
                     <li className="text-gray-500  my-2">Kids</li>
                     <li className="text-gray-500  my-2">Shoe</li>
                     <li className="text-gray-500  my-2">Accesories</li>
                    </ul>
                  </div>
                </div>
                <div className="lg:w-1/3">
               
                  <div>
                  <h1 className="font-bold text-xl mb-5">UseFull Links</h1>
                    <ul>
                     <li className="text-gray-500  my-2">News & Tips</li>
                     <li className="text-gray-500  my-2">About Us</li>
                     <li className="text-gray-500  my-2">Term & Conditions</li>
                     <li className="text-gray-500  my-2">Our Shop </li>
                     <li className="text-gray-500  my-2">Contact Us</li>
                    </ul>
                  </div>
                </div>

             </div>
              
    </div>
    <div className="footer2 flex flex-wrap  lg:w-1/2 sm:w-full px-5  ">
    <div className="lg:w-1/3">
                  <div>
                    <h1 className="font-bold text-xl mb-5">Contact</h1>
                  <p className="text-gray-500  my-2 leading-loose">
                  4708 Ruecker Wall,
                  Kassandratown, HI
                  </p>
                  <p className="text-gray-500  my-2 leading-loose">
                  +2(305) 587-3407
                  </p>
                  <p className="text-gray-500  my-2 leading-loose">
                  info@example.com
   
                  </p>
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <div>
                    <h1 className="font-bold text-xl mb-5">Newsletter</h1>
                  <p className="text-gray-500  my-2 leading-relaxed">
                  4708 Ruecker Wall, Kassandratown, HI 97729
                  </p>
                  <input type="text" placeholder="Enter email" className="w-9/12 mt-3 border-2  border-black px-3 py-4" />
                  <button className=" mt-3 py-3 px-12 text-center  bg-black text-white  font-bold  hover:bg-red-600 hover:text-white">
             Subscribe
            </button>
                  </div>
                </div>
              
            </div>
        </div>
      </div>
  )
}

export default Footer