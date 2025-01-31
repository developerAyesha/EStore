import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase';


const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success('User registered successfully');
      console.log('auth user ',auth.currentUser)
      reset();
    } catch (error) {
      toast.error(`Error signing up: ${error.message}`);
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
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    {...register('email', {
                      required: { value: true, message: 'Email is required' },
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email format',
                      },
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    {...register('password', {
                      required: { value: true, message: 'Password is required' },
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    })}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="submit"
                  className="px-7 py-2 rounded-md bg-pink-600 text-white inline my-3"
                />
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Do have an account yet?{' '}
              <Link href="/signin">
                <span className="px-1 font-semibold leading-6 text-pink-600 hover:text-pink-500">
                  Sign in
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
