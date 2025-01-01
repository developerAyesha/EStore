import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
const VerifyEmail = () => {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchVerification = async () => {
      if (router.isReady && router.query.token) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/verify-email?token=${router.query.token}`,
            {
              method: 'GET',
            }
          );

          const result = await response.json();
          console.log('result......',result)

          toast.success(result.message);
          if(response.ok){
            setTimeout(() => {
              router.push('/Login'); 
            }, 2000);
          }
       
          setStatusMessage(result.message);
          console.log('API response:', result);
        } catch (error) {
          setStatusMessage('Something went wrong.');
          console.error('Error fetching verification:', error);
        }
      }
    };

    fetchVerification();
  }, [router.isReady, router.query.token]);

  return (
    <>
      <h1>Email Verification</h1>
      <div>Status: {statusMessage || 'Verifying...'}</div>
    </>
  );
};

export default VerifyEmail;
