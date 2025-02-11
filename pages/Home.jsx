import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";
import { Ri24HoursLine } from "react-icons/ri";
import { MdReplay30 } from "react-icons/md";

const Home = () => {
  return (
    <>
      <div className="Banner">
        <div className="container max-w-[1200px] mx-auto py-0 px-4 static">
          <div className="container-inner relative">
            <div className="container-content relative block z-10 max-w-[450px] w-full min-h-[711px] pt-[170px] pr-0 pb-[180px] pl-0">
              <h1 className="text-black relative text-7xl font-semibold leading-tight">
                Up To <br />
                <span className="text-red-600 inline-block">50%</span> Discount
              </h1>
              <h3 className="font-semibold relative mb-6 pt-1">
                Summer Lookbook - 2020
              </h3>
              <p className="font-normal relative mb-7">
                New Modern Stylist Fashionable Men's Wear Jeans Shirt.
              </p>
              <div className="pt-2">
                <a className="px-6 py-4 border-black border-2 text-center font-semibold inline-block rounded-md cursor-pointer hover:bg-black hover:text-white transition duration-300">
                  Explore Now
                </a>
              </div>
            </div>
            <figure className="absolute right-0 bottom-0">
              <img
                className="align-middle object-cover w-full h-full"
                src="https://azim.commonsupport.com/Castro/assets/images/banner/banner-image-2.png"
              />
            </figure>
          </div>
        </div>
      </div>

      <div className="Top-Category relative mt-24 mb-8 text-center">
        <div className="container max-w-[1400px] mx-auto py-0 px-4 static">
          <div className="title relative block text-center mb-12">
            <h2 className="relative block text-4xl font-semibold leading-normal pb-1 ">
              Top Category
            </h2>
            <p className="relative block text-xl   pb-3">
              Follow the most popular trends and get exclusive items from castro
              shop
            </p>
            <span className="bg-[url('https://azim.commonsupport.com/Castro/assets/images/icons/separator-1.png')] block  h-10 bg-no-repeat bg-center  mx-auto"></span>
          </div>
          <div className="flex flex-wrap lg:px-14 sm:px-2">
            <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
              <div className=" w-full h-auto  mb-8">
                <figure className="h-auto w-full mb-4">
                  {" "}
                  <img src="/FemaleCategory.png" alt="" />
                </figure>
                <h4 className="mx-auto block font-semibold w-[110px] text-center">
                  Women Collections{" "}
                </h4>
              </div>
            </div>
            <div className="img-con  lg:w-1/4 sm:w-full px-5 ">
              <div className=" w-full h-auto mb-8 ">
                <figure className="h-auto w-full mb-4">
                  {" "}
                  <img src="/category-2.png" alt="" />
                </figure>
                <h4 className="mx-auto block font-semibold w-[110px] text-center">
                  Kids Collections{" "}
                </h4>
              </div>
            </div>
            <div className="img-con  lg:w-1/4  sm:w-full px-5 gap-2">
              <div className=" w-full h-auto  mb-8">
                <figure className="h-auto w-full mb-4">
                  {" "}
                  <img src="/category-3.png" alt="" />
                </figure>
                <h4 className="mx-auto block font-semibold w-[110px] text-center">
                  Summer Collections{" "}
                </h4>
              </div>
            </div>
            <div className="img-con  lg:w-1/4  sm:w-full px-5 gap-2">
              <div className=" w-full h-auto ">
                <figure className="h-auto w-full mb-4">
                  {" "}
                  <img src="/category-4.png" alt="" />
                </figure>
                <h4 className="mx-auto block font-semibold w-[110px] text-center">
                  Gents Collections{" "}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Top-Category relative  text-center">
        <div className="container max-w-[1400px] mx-auto py-0 px-4 static">
          <div className="title relative block text-center mb-12">
            <h2 className="relative block text-4xl font-semibold leading-normal pb-1 ">
              {" "}
              Our Top Collections
            </h2>
            <p className="relative block text-xl   pb-3">
              There are some product that we featured for choose your best
            </p>
            <span className="bg-[url('https://azim.commonsupport.com/Castro/assets/images/icons/separator-1.png')] block  h-10 bg-no-repeat bg-center  mx-auto"></span>

            <div className="top-list ">
              <ul className="flex flex-wrap  justify-center  mt-5">
                <li className="mx-4 font-bold text-lg  text-gray-500 hover:cursor-pointer focus:text-black hover:text-black hover:border-b-2 hover:border-black">
                  Best Seller
                </li>
                <li className="mx-4 font-bold text-lg  text-black  border-b-2  border-black hover:cursor-pointer hover:text-black ">
                  New Arraivals
                </li>
                <li className="mx-4 font-bold text-lg  text-gray-500 hover:cursor-pointer hover:text-black hover:border-b-2 hover:border-black">
                  Top Rate
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap lg:px-14  pt-6 sm:px-2">
              <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
                <div className=" w-full h-auto  mb-8">
                  <figure className="h-auto w-full mb-4">
                    {" "}
                    <img src="/collection1.jpg" alt="" />
                  </figure>
                  <h4 className=" block font-medium text-left  ">
                    Cold Crewneck Sweater{" "}
                  </h4>
                  <p className=" text-left font-normal mt-1"> $70.30</p>
                </div>
              </div>

              <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
                <div className=" w-full h-auto  mb-8">
                  <figure className="h-auto w-full mb-4">
                    {" "}
                    <img src="/collection2.jpg" alt="" />
                  </figure>
                  <h4 className=" block font-medium text-left  ">
                    Multi-Way Ultra Crop Top{" "}
                  </h4>
                  <p className=" text-left font-normal mt-1"> $50.00</p>
                </div>
              </div>
              <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
                <div className=" w-full h-auto  mb-8">
                  <figure className="h-auto w-full mb-4">
                    {" "}
                    <img src="/collection3.jpg" alt="" />
                  </figure>
                  <h4 className=" block font-medium text-left  ">
                    Side-Tie Tank{" "}
                  </h4>
                  <p className=" text-left font-normal mt-1"> $40.00</p>
                </div>
              </div>
              <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
                <div className=" w-full h-auto  mb-8">
                  <figure className="h-auto w-full mb-4">
                    {" "}
                    <img src="/collection4.jpg" alt="" />
                  </figure>
                  <h4 className=" block font-medium text-left  ">
                    Cold Crewneck Sweater{" "}
                  </h4>
                  <p className=" text-left font-normal mt-1"> $70.30</p>
                </div>
              </div>
              <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
                <div className=" w-full h-auto  mb-8">
                  <figure className="h-auto w-full mb-4">
                    {" "}
                    <img src="/collection5.jpg" alt="" />
                  </figure>
                  <h4 className=" block font-medium text-left  ">
                    Side-Tie Tank{" "}
                  </h4>
                  <p className=" text-left font-normal mt-1"> $70.30</p>
                </div>
              </div>
              <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
                <div className=" w-full h-auto  mb-8">
                  <figure className="h-auto w-full mb-4">
                    {" "}
                    <img src="/collection6.jpg" alt="" />
                  </figure>
                  <h4 className=" block font-medium text-left  ">
                    Cold Crewneck Sweater{" "}
                  </h4>
                  <p className=" text-left font-normal mt-1"> $70.30</p>
                </div>
              </div>
              <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
                <div className=" w-full h-auto  mb-8">
                  <figure className="h-auto w-full mb-4">
                    {" "}
                    <img src="/collection7.jpg" alt="" />
                  </figure>
                  <h4 className=" block font-medium text-left  ">
                    Cold Crewneck Sweater{" "}
                  </h4>
                  <p className=" text-left font-normal mt-1"> $70.30</p>
                </div>
              </div>
              <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
                <div className=" w-full h-auto  mb-8">
                  <figure className="h-auto w-full mb-4">
                    {" "}
                    <img src="/collection8.jpg" alt="" />
                  </figure>
                  <h4 className=" block font-medium text-left  ">
                    Cold Crewneck Sweater{" "}
                  </h4>
                  <p className=" text-left font-normal mt-1"> $70.30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta mb-96">
        <div className="img-layer bg-[url('https://azim.commonsupport.com/Castro/assets/images/background/cta-bg-1.jpg')] absolute  w-full h-[675px] bg-no-repeat bg-cover bg-center"></div>
        <div className="container max-w-[1400px] mx-auto py-0 px-4 static">
          <div className="cta-inner relative top-96 block bg-white py-[75px] px-[200px] text-center ">
            <h2 className="relative block  mb-[27px] text-4xl font-bold">
              End of Season Clearance Sale upto 50%
            </h2>
            <p className="mb-[33px] font-semibold text-xl">
              Welcome to the new range of shaving products from master barber.
              We have over three decades of experience in the male grooming
              industry
            </p>
            <button className="py-3 px-12 text-center  bg-black text-white  font-bold  hover:bg-red-600 hover:text-white">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className="service-section mt-96  ">
        <div className="container max-w-[1400px] mx-auto px-4 static border-t-2 border-b-2 py-14">
          <div className="flex flex-wrap lg:px-14  pt-6 sm:px-2">
            <hr></hr>
            <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
              <div className=" flex align-middle justify-center gap-x-4 ">
                <div >
                
                <CiDeliveryTruck className="text-7xl" />
                </div>
                <div>
                  <h1 className="mb-1 font-semibold  text-xl">Free Shipping</h1> 
                  <p className="text-gray-500">Free shipping on oder over $100</p>
                </div>

               
              </div>
              
            </div>
            <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
              <div className=" flex align-middle justify-center gap-x-4 ">
                <div >
                
                <RiSecurePaymentLine className="text-7xl" />
                </div>
                <div>
                  <h1 className="mb-1 font-semibold  text-xl">Secure Payment</h1> 
                  <p className="text-gray-500">We ensure secure payment with PEV</p>
                </div>

               
              </div>
              
            </div>
            <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
              <div className=" flex align-middle justify-center gap-x-4 ">
                <div >
                
                <Ri24HoursLine className="text-7xl" />
                </div>
                <div>
                  <h1 className="mb-1 font-semibold  text-xl">Support 24/7</h1> 
                  <p className="text-gray-500">Contact us 24 hours a day, 7 days a week</p>
                </div>

               
              </div>
              
            </div>

            <div className="img-con  lg:w-1/4 sm:w-full px-5  ">
              <div className=" flex align-middle justify-center gap-x-4 ">
                <div >
                
                <MdReplay30 className="text-7xl" />
                </div>
                <div>
                  <h1 className="mb-1 font-semibold  text-xl">30 Days Return</h1> 
                  <p className="text-gray-500">Simply return it within 30 days for an exchange.</p>
                </div>

               
              </div>
              
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default Home;
