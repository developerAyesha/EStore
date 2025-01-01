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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/ecologo.png"
            className="mx-auto h-36 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form  className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
        <input   className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
           {...register("name", { required:{value:true,message:"username is required "},minLength:{ value:5,message:'Username is shorter than 5 characters.'}})}/>
           {errors.Username && <p>{errors.Username.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email 
          </label>
          <div className="mt-2">
          <input   className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
          {...register("email", { required: {value:true,message:"email is required "},  pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email format',
          },} )}/>
          {errors.Email&&<p>{errors.Email.message}</p>}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
         
          </div>
          <div className="mt-2">
          <input  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
           {...register("password", { required: {required:true,message:"password is required "},minLength:{value:8,message:'Password is shorter than 8 characters.'}})}/>
           {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>


        <div className='flex justify-center items-center'>
          
           <input type="submit" className='px-7 py-2 rounded-md bg-pink-600 text-white  inline my-3' />
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Do have an account yet? 
      <span className=" px-1 font-semibold leading-6 text-pink-600 hover:text-pink-500">
        Sign  in
        </span>
      </p>
    </div>
  </div>
      </div>
   </>
  )
}

export default SignUp