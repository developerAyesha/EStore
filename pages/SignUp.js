import React,{useState,useRef,useEffect} from 'react'
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
const SignUp = () => {
 const {
  register,
  handleSubmit,
  reset,
  watch,
  setValue,
  formState: { errors },
} = useForm()


useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  
  if (token) {
    toast.warning('User not already exist plz signUp Then login')
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const {name,email}=decodedToken;
      console.log('name..',name);
      console.log('email.....',email);
      setValue('name',name);
      setValue('email',email);
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Invalid Token:", error.message);
    }
  }
}, []);



 const onSubmit = async (data) => {

  try {
  
    toast.success('Plz Check Your Email and verify !');
    const response = await fetch('http://localhost:3000/api/SignUp', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
   
     reset()
      toast.success('User added successfully!');
    
      const data = await response.json();
      console.log('Server response:', data); 
    } else {
     
      const errorData = await response.json();
      console.error('Error: ', errorData);
    }
  } catch (error) {
 
    console.error('An error occurred:', error);
  }
};


  return (
   <>
   <ToastContainer />
   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-pink-500">
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-lg rounded-lg p-8">
    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-6">
      Sign up to your account
    </h2>
    
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
          Username
        </label>
        <input
          id="name"
          className="block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-pink-600 focus:ring-2 focus:ring-pink-600 transition duration-200"
          {...register("name", {
            required: { value: true, message: "Username is required" },
            minLength: { value: 5, message: 'Username must be at least 5 characters.' }
          })}
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
          Email
        </label>
        <input
          id="email"
          className="block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-pink-600 focus:ring-2 focus:ring-pink-600 transition duration-200"
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email format',
            },
          })}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="block w-full rounded-md border-2 border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-pink-600 focus:ring-2 focus:ring-pink-600 transition duration-200"
          {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength: { value: 8, message: 'Password must be at least 8 characters.' }
          })}
        />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      <div className='flex justify-center items-center'>
        <input
          type="submit"
          className='w-full px-7 py-2 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700 transition duration-200'
          value="Sign Up"
        />
      </div>
    </form>

    <p className="mt-6 text-center text-sm text-gray-500">
      Already have an account? 
     <Link href='/Login'><span className="px-1 font-semibold leading-6 text-pink-600 hover:text-pink-500 cursor-pointer">
        Sign in
      </span>
      </Link> 
    </p>
  </div>
</div>
   </>
  )
}

export default SignUp