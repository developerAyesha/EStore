import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken"; 
import { DbConnection } from "../DB";
const User = require('../../../Models/User');
export default async function handler(req, res) {
  const { code } = req.query;


  if (!code) {
    return res.status(400).json({ error: "Authorization code missing" });
  }

  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/api/auth/callback",
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { id_token, access_token } = response.data;

    // Fetch user info
    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
    );

    // Custom logic: Check if user exists, redirect accordingly
    const user = userInfo.data;
    console.log("user ........",user);
    const {email,name}=user;
    if (user) {
        await DbConnection();
        const alreadyUser = await User.findOne({email});
        console.log('user is ',alreadyUser);
        if(alreadyUser){
            res.redirect("/")
        }
        else {
          const token = jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: "1h" });
          console.log('token in server .......',token);
          res.redirect(`/SignUp?token=${encodeURIComponent(token)}`);

        }
 
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Authentication failed" });
  }
}
