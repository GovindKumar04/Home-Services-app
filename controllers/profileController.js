// homeController.js
const jwt= require('jsonwebtoken')
require('dotenv').config()
const home = (req, res) => {
    try {
      // Decode token to get user information
      const token = req.cookies.token;
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      
      // Get user information from decoded token
      const user = {
        email: decodedToken.email,
        id: decodedToken.id
      };
      
      // Render home page with user information
      res.render('home', { user });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while loading home page.');
    }
  };
  
  module.exports = { home };
  