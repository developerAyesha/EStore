
import React from 'react'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; 

const SignnUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const password = watch('password'); 
      const onSubmit = (data) => {
        toast.success("Form is submitted successfuly")
        console.log(data)
      }
  return (
    <>
    <ToastContainer/>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form  className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
        <input   className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
           {...register("Username", { required: true,minLength:{ value:5,message:'Username is shorter than 5 characters.'}})}/>
           {errors.Username && <p>{errors.Username.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email 
          </label>
          <div className="mt-2">
          <input   className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
          {...register("Email", { required: true,  pattern: {
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
           {...register("password", { required: true,minLength:{value:8,message:'Password is shorter than 8 characters.'}})}/>
           {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
         
          </div>
          <div className="mt-2">
          <input  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
           {...register('confirmPassword',{required:true, validate: (value) =>
            value === password || 'Passwords do not match', 
        })}/>
         {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
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
  </>
  )
}

export default SignnUp