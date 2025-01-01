import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jsonwebtoken';

const Callback = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      const fetchLinkedInData = async () => {
        try {
         
          const response = await axios.get(`/api/linkedin?code=${code}`,{ headers: { 'Cache-Control': 'no-cache' }});
          // console.log("Access Token:", response.data.accessToken);
          // console.log("User Profile:", response.data.profile);
          // console.log("User Email:", response.data.profile.email);
          const { email, name } = response.data.profile;

        console.log('email in callback page ......',email);
          const userResponse = await axios.get(`/api/LinkedinLogin?email=${email}`,{ headers: { 'Cache-Control': 'no-cache' }});
          //  console.log('userResponse....',userResponse);
           console.log('respinse status .',userResponse.status);
           const res=userResponse.JSON();
           console.log('response ..........',res);
           
          if (userResponse.status === 200) {
          
            localStorage.setItem('token', response.data.accessToken);
            toast.success('User logged in successfully');
            router.push('/');
          } else {
            // If the user does not exist, generate a token for sign-up
            // const token = jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: "1h" });
            // toast.warning('User not found, please create an account first');
            router.push('/SignUp');
          }
        } catch (error) {
          console.error("Error fetching LinkedIn data:", error);
          toast.error('Errors occurs during LinkedIn login');
        }
      };

      fetchLinkedInData();
    }
  }, [code, router]);

  return <div>Loading LinkedIn Data...</div>;
};

export default Callback;
