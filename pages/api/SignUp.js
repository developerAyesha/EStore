import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
const User = require('../../Models/User')
const jwt = require('jsonwebtoken');
import nodemailer from 'nodemailer';
const DbConnection = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to the database');
    return;
  }
  try {
    await mongoose.connect('mongodb://localhost:27017/CodesWeare', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw new Error('Database connection error');
  }
};

export default async function handler(req, res) {
  console.log('Handler started');

  try {
    await DbConnection();
  } catch (error) {
    console.error('Error establishing database connection:', error);
    return res.status(500).json({ success: false, message: 'Failed to connect to the database' });
  }

  console.log('Database connection established');

  try {
   if(req.method=='POST'){
    const {name,email,password}=req.body;
    console.log('password',password);
    console.log(req.body);
    const existingUser = User.findOne({email});
    console.log('existingUser..',existingUser)

    if(existingUser){
      res.status(400).json({message:'User are already exist'});
    }
    let hashPasword;

  const hashPassword = await bcrypt.hash(password, 10);
  console.log('hash password.....',hashPassword)
 
  const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1h'});
  console.log('token...',token)
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verifyEmail?token=${token}`;
  

  const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
    }
  })
  const htmlTemplate = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        background-color: #0056b3;
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
      .content p {
        font-size: 16px;
        color: #555;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        background-color: #0056b3; /* Darker blue to match the theme */
        padding: 14px 40px;
        text-decoration: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.2); /* Subtle shadow using the button color */
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
        background-color: #0056b3;
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
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Estore</h1>
      </div>
      <div class="content">
        <h2>Verify Your E-mail Address</h2>
        <p>Dear {{name}},</p>
        <p>You're almost ready to get started. Please click on the button below to verify your email address and enjoy <b>EStore</b> services with us!</p>
        <a href="{{verify}}" class="button" style ="color: white">VERIFY YOUR EMAIL</a>
        <p>Thanks,<br>EStore Team</p>
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
  </html>
  
      `;
  
    const htmlContent = htmlTemplate
      .replace("{{name}}", name)
      .replace("{{verify}}", verificationUrl);
  const mailOptions={
    from:process.env.EMAIL_USER,
    to:email,
    subject:'Verify your Email',
    html:htmlContent
  }

   await transporter.sendMail(mailOptions);
   const newUser = new User({
    name,
    email,
    password: hashPassword,
    isVerified: false,
  });

  await newUser.save();
   
   return res.status(200).json({success:true,message:'Signup successful! Please verify your email.'})

}
   else {
    return res.status(400).json({ success: false, message: 'Error sending email. Please try again.' })
   }
   
  } catch (error) {
    console.error('Error retrieving creating User:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
