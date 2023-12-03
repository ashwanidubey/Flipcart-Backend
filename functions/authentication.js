require('dotenv').config()
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');//bcrypt use to ecncrpt password
const jwt = require('jsonwebtoken');//jwt use to validate user
const User=require('../models/User');
const jwt_secrets=process.env.JWT_TOKEN

const authentication = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the email and password match a user in the database
            const user = await User.findOne({ email });
              if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
              //validating passowrd
            const passwordmatched=await bcrypt.compareSync(password,user.password);
  
         if(passwordmatched===true)
        {
        const payload={id:user.id} 
        
        const token = jwt.sign(payload, jwt_secrets,{ expiresIn: '1h' });

         //sending response
        return res.send({token,success:true,email,name:user.name});
        }
        else
        {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
         
        }

        
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    signup: async (req, res) => {
        try {
            const { email, password, name } = req.body;
    
            // Check if the email is already in use
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }
            //salt is combined with password to make it more confusin
            var salt = await bcrypt.genSaltSync(10);
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, salt);
    
            // Create a new user with the hashed password
            const data = {
                email,
                password: hashedPassword,
                name
            };
    
            const user= await User.create(data);
             const payload={id:user.id} 
           const token = jwt.sign(payload, jwt_secrets,{ expiresIn: '1h' });

           //sending response
            return res.send({token,success:true , email, name});
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    




    logout: (req, res) => {
        // Dummy logic for logout
        // In a real application, you would destroy the session or token
        res.json({ message: 'Logout successful' });
    },
    forgetPassword: (req, res) => {
        // Dummy logic for forget password
        // In a real application, you would send a password reset email or generate a reset token
        res.json({ message: 'Password reset email sent' });
    },
};

module.exports = authentication;
