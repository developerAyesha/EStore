import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  console.log('Handler started');

   console.log('req.body......',req.body)
   const {name,email}=req.body.personalInfo;
   const {cartItems,tempCart} = req.body;
   console.log('Database connection established');

  try {

    

  

    const transporter = nodemailer.createTransport({
      service:'Gmail',
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
      }
    })

  
let cartHTML = '';

if (tempCart && Object.keys(tempCart).length > 0) {
  
  cartHTML = `
     <tr>
        
          <td style="padding: 10px; width: 150px;">
            <img  src="https://cdn-imgix.headout.com/media/images/c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.jpg"style="width: 100%; border-radius: 8px;">
          </td>
          <td style="padding: 10px; vertical-align: top;">
            <h3 style="margin: 0; color: #333;">${tempCart.name}</h3>
            <p style="margin: 5px 0;">Color: ${tempCart.color}</p>
            <p style="margin: 5px 0;">Size: ${tempCart.size}</p>
            <p style="margin: 5px 0;">Qty: ${tempCart.qty}</p>
            <p style="margin: 5px 0; font-weight: bold; color: #8B0000;">$${tempCart.price}</p>
          </td>
        </tr>
  `;
} else if (cartItems && Object.keys(cartItems).length > 0) {
 
  cartHTML = cartItems && Object.entries(cartItems).map(([key, item]) => {
    return `
        <tr>
        
          <td style="padding: 10px; width: 150px;">
            <img  src="https://cdn-imgix.headout.com/media/images/c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.jpg"style="width: 100%; border-radius: 8px;">
          </td>
          <td style="padding: 10px; vertical-align: top;">
            <h3 style="margin: 0; color: #333;">${item.name}</h3>
            <p style="margin: 5px 0;">Color: ${item.color}</p>
            <p style="margin: 5px 0;">Size:${item.size}</p>
            <p style="margin: 5px 0;">Qty: ${item.qty}</p>
            <p style="margin: 5px 0; font-weight: bold; color: #8B0000;">${item.price}</p>
          </td>
        </tr>
    `;
  }).join('');
} else {
  // Handle case where neither tempCart nor cartItems is provided
  cartHTML = '<p>No items in the cart.</p>';
}

// Now cartHTML will have the appropriate HTML content based on tempCart or cartItems
console.log(cartHTML);

  
      const htmlContent = `<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Email Template</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
          }
      
          .container {
            max-width: 500px;
            width: 100%;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
            margin: auto;
            overflow: hidden;
            border: 5px solid #e0e0e0;
          }
      
          .header {
            background-color: rgb(158, 20, 66);
            padding: 20px;
            text-align: center;
            color: white;
          }
      
          .header h1 {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin: 0;
          }
      
          .content {
            padding: 20px;
            text-align: center;
          }
      
          .content h2 {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
      
          .thanks p {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
          }
      
          .button {
            display: inline-block;
            background-color: rgb(158, 20, 66);
            padding: 14px 40px;
            text-decoration: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.2);
            margin: 20px 0;
          }
      
         
      
          .footer {
            background-color: #e0e0e0;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #555;
          }
      
          .footer a {
            display: inline-block;
            margin: 0 10px;
          }
      
          .footer img {
            width: 30px;
          }
      
          .copyright {
            background-color: rgb(158, 20, 66);
            color: white;
            padding: 10px;
            font-size: 12px;
            text-align: center;
          }
      
          @media only screen and (max-width: 600px) {
            .header h1 {
              font-size: 28px;
            }
      
            .content h2 {
              font-size: 20px;
            }
      
            .button {
              width: 100%;
              box-sizing: border-box;
              padding: 12px;
            }
      
            .footer {
              font-size: 12px;
            }
      
            .cart-item {
              padding: 10px 25px;
            }
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <div class="header">
            <h1>Estore</h1>
          </div>
          <div class="content">
            <p>Dear Ayesha,</p>
            <p>Your order was successfully placed!</p>
            <p>Order ID #1234</p>
          </div>
      
         <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
 
 
  <tr>
    <td style="padding: 20px;">
      <table style="width: 100%; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
       ${cartHTML}
      </table>
    </td>
  </tr>
</table>

      
          <div class="thanks">
            <p style="text-align: center;">Thanks,<br>EStore Team</p>
          </div>
      
          <div class="footer">
            <p>Get in touch</p>
            <p><strong>+92 300 4529395</strong><br>info@EStore.com</p>
            <div>
              <a href="#"><img src="https://img.icons8.com/ios-filled/50/facebook.png" alt="Facebook"></a>
              <a href="#"><img src="https://img.icons8.com/ios-filled/50/twitter.png" alt="Twitter"></a>
              <a href="https://www.linkedin.com/company/educist-testing-services"><img src="https://img.icons8.com/ios-filled/50/linkedin.png" alt="LinkedIn"></a>
              <a href="#"><img src="https://img.icons8.com/ios-filled/50/instagram-new.png" alt="Instagram"></a>
            </div>
          </div>
      
          <div class="copyright">
            <p>Copyright 2024 © EStore All Rights Reserved</p>
          </div>
        </div>
      </body>
      
      </html>`
      ;
    
     
       
    const mailOptions={
      from:process.env.EMAIL_USER,
      to:email,
      subject:'Order Confirmed',
      html:htmlContent
    }
  
     await transporter.sendMail(mailOptions);
     
     
     return res.status(200).json({success:true,message:'order placed successful! Please verify your email.'})
   
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
