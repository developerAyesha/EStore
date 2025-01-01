import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Order = () => {
  const [tempState, setTempState] = useState(false);
  const { orderDetails } = useSelector((state) => state.order);

  // Default to empty object if orderDetails is undefined or null
  const { personalInfo, amount, tempCart, cartItems } = orderDetails || {};

  useEffect(() => {
    console.log("useEffect working .........");
    console.log('order details in order page .......',orderDetails)
    if (orderDetails && orderDetails.tempCart) {
      console.log("temp cart exists", orderDetails.tempCart);
      setTempState(true);
    } else {
      setTempState(false); // No tempCart, use cartItems
    }
  }, [orderDetails]);

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 p-4 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest text-center my-2">
                ECOMMERCE
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 text-center my-2">
                Order Id : #15678
              </h1>
              <p className="leading-relaxed mb-4 text-center my-2">
                Your Order has been successfully placed
              </p>

              <section className="text-gray-600 pt-6 body-font overflow-hidden">
                {tempState ? (
                  <div className="container lg:px-52 sm:px-4">
                    <div className="space-y-6">
                      <div className="shadow-lg p-4">
                        <div className="mx-4 flex flex-col sm:flex-row gap-12 sm:gap-6">
                          <div className="flex-shrink-0">
                            <img
                              src="https://cdn-imgix.headout.com/media/images/c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.jpg"
                              alt={tempCart.name}
                              className="w-48 h-auto object-cover rounded-lg shadow-lg"
                            />
                          </div>
                          <div className="ml-4 flex-grow">
                            <h2 className="text-xl mb-2 font-semibold text-gray-900">{tempCart.name}</h2>
                            <div className="text-gray-700">
                              <p>Color: {tempCart.color}</p>
                              <p>Size: {tempCart.size}</p>
                              <div className="flex flex-col sm:flex-row sm:justify-between lg:justify-between gap-2 sm:gap-4">
                                <p>Qty: {tempCart.qty}</p>
                                <p className="text-lg font-bold">${tempCart.price}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-center text-2xl text-black font-bold md:py-10 py-1">
                      Total Price Rs: {tempCart.price}
                    </h1>
                  </div>
                ) : (
                  <div className="container lg:px-52 sm:px-4">
                    <div className="space-y-6">
                      {cartItems && Object.entries(cartItems).length > 0 ? (
                        Object.entries(cartItems).map(([key, item], id) => (
                          <div key={id} className="shadow-lg p-4">
                            <div className="mx-4 flex flex-col sm:flex-row gap-12 sm:gap-6">
                              <div className="flex-shrink-0">
                                <img
                                  src="https://cdn-imgix.headout.com/media/images/c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.jpg"
                                  alt={item.name}
                                  className="w-48 h-auto object-cover rounded-lg shadow-lg"
                                />
                              </div>
                              <div className="ml-4 flex-grow">
                                <h2 className="text-xl mb-2 font-semibold text-gray-900">{item.name}</h2>
                                <div className="text-gray-700">
                                  <p>Color: {item.variant}</p>
                                  <p>Size: {item.size}</p>
                                  <div className="flex flex-col sm:flex-row sm:justify-between lg:justify-between gap-2 sm:gap-4">
                                    <p>Qty: {item.qty}</p>
                                    <p className="text-lg font-bold">${item.price}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>No items in the cart.</div>
                      )}
                    </div>
                    <h1 className="text-center text-2xl text-black font-bold md:py-10 py-1">
                      Total Price Rs: {amount}
                    </h1>
                  </div>
                )}
              </section>

              <div className="container mx-auto p-6 max-w-screen-lg bg-white rounded-lg mt-2">
                <h1 className="text-gray-900 text-2xl font-medium mb-6 text-center">
                  Customer Details
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 shadow-lg p-6">
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="font-semibold text-gray-700">Name</h2>
                    <p className="text-gray-900">{personalInfo?.name}</p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="font-semibold text-gray-700">Email</h2>
                    <p className="text-gray-900">{personalInfo?.email}</p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="font-semibold text-gray-700">Address</h2>
                    <p className="text-gray-900">{personalInfo?.address}</p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="font-semibold text-gray-700">City</h2>
                    <p className="text-gray-900">{personalInfo?.city}</p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="font-semibold text-gray-700">State</h2>
                    <p className="text-gray-900">{personalInfo?.state}</p>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="font-semibold text-gray-700">Phone</h2>
                    <p className="text-gray-900">{personalInfo?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
