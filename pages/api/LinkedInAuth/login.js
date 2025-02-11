import axios from 'axios';
import { DbConnection } from "../DB";
const User = require('../../../Models/User');
import jwt from "jsonwebtoken"; 
export default async function handler(req, res) {
  const { code } = req.query;
 

  if (!code) {
    return res.status(400).json({ message: "Authorization code missing" });
  }


  const CLIENT_ID = '77g9rtbntwj3qh';
  const CLIENT_SECRET = 'WPL_AP1.dTrCnHY9xYj5GGdJ.HaNjSQ=='
  const REDIRECT_URI = "http://localhost:3000/api/LinkedInAuth/callback";

  try {
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log('token....',tokenResponse);
    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
 
    const user = profileResponse.data;
    console.log("profile data.......",user);
    const {email}=user;

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

    res.status(200).json({ accessToken: access_token, user});
  } catch (error) {
    console.error("LinkedIn API error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
