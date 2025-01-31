import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoBagCheck } from "react-icons/io5";
import { RemoveCart, addCart, clearCart } from "@/pages/Store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ subtotal }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [showLogout, setShowLogout] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [token, setToken] = useState("");

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleLogoutMenu = () => {
    setShowLogout(!showLogout);
  };

  const logOut = async () => {
    try {
      const response = await axios.post('/api/logOut');
      if (response.status === 200) {
        localStorage.removeItem('token');
        setToken(null);
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="flex justify-between items-center sticky top-0 z-20 bg-white shadow-md px-4 py-3">
      <div className="logo">
        <Image src="/ecologo.png" width={100} height={30} alt="Logo" />
      </div>

      <div className="hidden md:flex nav">
        <ul className="flex items-center gap-5 font-bold">
          <Link href="/Tshirts"><li className="cursor-pointer">Tshirts</li></Link>
          <Link href="/Hoodies"><li className="cursor-pointer">Hoodies</li></Link>
          <Link href="/Mugs"><li className="cursor-pointer">Mugs</li></Link>
          <Link href="/Sticker"><li className="cursor-pointer">Stickers</li></Link>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        {token ? (
          <>
            <MdAccountCircle
              className="text-2xl cursor-pointer"
              onClick={toggleLogoutMenu}
            />
            {showLogout && (
              <div className="absolute right-0 mt-16 bg-pink-300 shadow-lg rounded-sm w-28">
                <ul>
                  <li
                    className="px-2 py-2 text-center cursor-pointer hover:bg-pink-400 transition"
                    onClick={logOut}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <Link href="/Login">
            <button className="text-white bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-600 transition duration-200">
              Login
            </button>
          </Link>
        )}
        <FaCartShopping className="text-2xl cursor-pointer" onClick={toggleCart} />
      </div>

      {/* Overlay for Sidebar */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleCart}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 sm:w-72 h-full bg-pink-100 p-5 shadow-lg transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } z-20`}
      >
        <h2 className="font-bold text-lg text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-4 right-4 cursor-pointer text-2xl text-pink-500"
        >
          <IoIosCloseCircle />
        </span>

        <ol className="list-decimal font-semibold px-2 mt-5">
          {cart && Object.keys(cart).length === 0 ? (
            <div className="my-4 font-semibold text-center">Your Cart is Empty!</div>
          ) : (
            Object.keys(cart).map((k) => (
              <li key={k} className="mb-3">
                <div className="flex justify-between items-center">
                  <div className="font-semibold w-2/3">
                    {cart[k]?.name} ({cart[k]?.color}/{cart[k]?.size})
                  </div>
                  <div className="flex items-center space-x-2">
                    <CiCircleMinus
                      onClick={() => dispatch(RemoveCart(k))}
                      className="cursor-pointer"
                    />
                    <span>{cart[k].qty}</span>
                    <CiCirclePlus
                      onClick={() => dispatch(addCart({ itemCode: k }))}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            ))
          )}
        </ol>

        <div className="flex justify-center space-x-3 mt-5">
          <Link href="/Checkout">
            <button className="flex items-center text-white bg-pink-500 py-2 px-3 rounded-md hover:bg-pink-600">
              <IoBagCheck className="mr-1" /> Checkout
            </button>
          </Link>
          <button
            className="text-white bg-pink-500 py-2 px-4 rounded-md hover:bg-pink-600"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
