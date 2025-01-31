import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 
import { useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


  
const Login = () => {
  
  const router = useRouter()
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const CLIENT_ID = "77g9rtbntwj3qh";
  const REDIRECT_URI = "http://localhost:3000/api/LinkedInAuth/callback";
  console.log('client ID',process.env.GOOGLE_CLIENT_ID)

  const handleLinkedInLogin = () => {
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20profile%20email`;
    window.location.href = linkedInAuthUrl;
  };
  const handleGoogleLogin = () => {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=669402732974-sldiki1eaerboqj088rlpr7hrbbqllis.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/auth/callback&response_type=code&scope=openid+email+profile&access_type=offline&prompt=consent'
    window.location.href = googleAuthUrl;

  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async (data) => {
   
    console.log(data);
    try {
      const response = await fetch('http://localhost:3000/api/Login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
       
        const res=await response.json();
        console.log('response,,,',res);
        console.log('login res ........',response)
      if (response.ok) {
       localStorage.setItem('token',res.token);
         reset();
        toast.success('User Login successfully!');
        setTimeout(()=>{
          router.push('http://localhost:3000')
        },2000)
         
      } else {
        console.log('execute else ......')
         router.push('/SignUp')
        const errorData = await response.json();
        console.log('error data',errorData);
        toast.warning(errorData.message)
      }
    } catch (error) {
   
      console.error('An error occurred:', error);
    }
  }
  return (
 <>
 
 <div className="flex min-h-screen bg-pink-500 flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white rounded-2xl shadow-2xl px-10 py-12">
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
        Welcome Back!
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-200"
            placeholder="Enter your email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>

        <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-200"
          placeholder="Enter your password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? (
            <AiFillEyeInvisible className="h-5 w-5 text-gray-500" aria-hidden="true" />
          ) : (
            <AiFillEye className="h-5 w-5 text-gray-500" aria-hidden="true" />
          )}
        </button>
      </div>
      {errors.password && (
        <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>
      )}
    </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-pink-600 hover:text-pink-500">
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg bg-pink-600 hover:bg-pink-700  text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={handleLinkedInLogin}
            className="w-full flex justify-center py-2 px-4 rounded-lg bg-pink-600 text-white font-semibold shadow-md hover:bg-pink-700 transform hover:scale-105 transition-all duration-200"
          >
            LinkedIn
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center py-2 px-4 rounded-lg bg-pink-600 text-white font-semibold shadow-md hover:bg-pink-700 transform hover:scale-105 transition-all duration-200"
          >
            Google
          </button>
        </div>
      </div>
    </div>

    <p className="mt-8 text-center text-sm text-gray-600">
      Don’t have an account?{" "}
      <a href="/SignUp" className="font-semibold text-pink-600 hover:text-pink-500">
        Sign up
      </a>
    </p>
  </div>
</div>
   
    </>
  )
}

 

export default Login