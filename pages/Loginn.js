import React,{useEffect} from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';  
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import { auth } from '@/utils/firebase'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useForm } from "react-hook-form"
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
  const onSubmit = async (data) => {
   
    console.log(data);
    try {
        // Sign in user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
  
        // Successfully logged in, redirect user to dashboard or home page
        toast.success('User signed in successfully!');
        console.log('User signed in successfully', user);
  
        router.push('/');  // Redirect to the dashboard or a protected page
  
      } catch (error) {
        toast.error(`Error signing in: ${error.message}`);
        console.error('Error signing in:', error);
       
      }
  }
  const handleGoogleSignIn = async () => {
    
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      toast.success('User signed in with Google successfully!');
      console.log('User signed in with Google', user);

      router.push('/');  // Redirect to a protected page
    } catch (error) {
      toast.error(`Error signing in with Google: ${error.message}`);
      console.error('Error signing in with Google:', error);
     
    }
  };
  return (
 <>
 
 <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form  className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email 
          </label>
          <div className="mt-2">
          <input   className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
          {...register("email", { required:{value:true,message:"Email is required"},  pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email format',
          },} )}/>
          {errors.email&&<p>{errors.email.message}</p>}
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
           {...register("password", { required: {
            value:true,
            message : "password is required "
           },minLength:{value:8,message:'Password is shorter than 8 characters.'}})}/>
           {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
     

        <div className='flex justify-center items-center'>
          
           <input type="submit" value={'Sign In '} className='px-6 py-1.5 rounded-md bg-pink-600 text-white  inline my-3 hover:cursor-pointer' />
        </div>
      </form>

      <p className="mt-2 text-center text-sm text-gray-500 hover:cursor-pointer">
        Do have an account yet? 
      <span className=" px-1 font-semibold leading-6 text-pink-700 hover:text-pink-500 hover:cursor-pointer">
        Sign  in
        </span>
      </p>
    </div>
    <div className='flex justify-center py-4'>
    <button className='bg-pink-600 text-white px-4 rounded-md py-2' onClick={handleLinkedInLogin}>Sign in with linkedin</button>
    </div>
    <div className='flex justify-center py-1'>
    <button className='bg-pink-600 text-white px-4 rounded-md py-2' onClick={handleGoogleSignIn}
    >Sign in with Google</button>
    </div>
  </div>
   
    </>
  )
}

 

export default Login