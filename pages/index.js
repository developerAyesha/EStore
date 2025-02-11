import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Ecommerce website</title>
        <meta name="description" content="Ecommerce website developed by ayesha" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   
     <div>
      <img src='https://cdn.shopify.com/s/files/1/0070/7032/files/ecommerce_20platforms.png' className="object-cover w-full h-1/6"></img>
     </div>
  
     
     
    </>
  );
}

