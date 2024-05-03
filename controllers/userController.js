const User = require('../schemas/userModel');
const bcrypt= require('bcrypt')
require('dotenv').config()
const jwt= require('jsonwebtoken')

const SECRET_KEY=process.env.SECRET_KEY

const signup = ( async (req, res) => {
    const { first_name, last_name, email, mobile_number, password, confirm_password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({message:'User already exists'});
        }

        if (confirm_password !== password) {
            return res.status(400).send('Passwords do not match');
        }
        const hashPassword = await bcrypt.hash(password,10)
        const newUser =  User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            mobile_number: mobile_number,
            password: hashPassword
        
        });
        await newUser.save();
        const token=  jwt.sign({email:newUser.email, id:newUser._id}, SECRET_KEY)
        res.status(201).render('login').json({user, newUser, token: token});

    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while signing up.');
    }
});

const signin = async (req, res) => {
    const { email_phone, password } = req.body;
  
    try {
      let existingUser = await User.findOne({ email: email_phone });
  
      if (!existingUser) {
        return res.status(400).json({ message: 'User does not exist' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY);
      
      // Set token as a cookie
      res.cookie('token', token, { httpOnly: true });
      
      // Redirect to home page
      res.redirect('home');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while logging in.' });
    }
  };
  
  module.exports = { signup, signin };
  