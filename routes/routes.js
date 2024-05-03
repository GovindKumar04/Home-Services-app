const express = require('express');
const jwt= require('jsonwebtoken')
const router = express.Router();
const LoginDetail = require('../schemas/userModel');
const BookingDetails = require('../schemas/booking');
const path = require('path');
const session = require('express-session');
const { signup, signin } = require('../controllers/userController');
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY;

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/book', (req, res) => {
    const { booking_name, price } = req.body;
    console.log(booking_name, price);

    var bookingDetail = BookingDetails({
        order_name: booking_name,
        price: price
    });

    bookingDetail.save()
        .then(() => {
            return BookingDetails.find();
        })
        .then((book) => {
            console.log(book, "hello");
            res.render('book', { book: book });
        })
        .catch((err) => {
            console.error(err);
            res.send('Error!');
        });
});

router.get('/book', (req, res) => {
    BookingDetails.find()
        .then((book) => {
            res.render('book', { book: book });
        })
        .catch((err) => {
            console.error(err);
            res.send('Error!');
        });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    // Assuming you have a login form and validate user credentials
    const { email, password } = req.body;
  
    // For demo, let's assume user is authenticated
    // In real scenario, you need to validate user credentials
    const user = { email: email, id: 1 };
  
    // Create a session and store user info
    req.session.user = user;
  
    res.redirect('/home');
  });

router.get('/beauty', (req, res) => {
    res.render('beauty')
})




router.get('/house', (req, res) => {
    res.render('house');
})

router.get('/home', (req, res) => {
    
    const user = req.session.user;
    
   
    res.render('home', { user });
  });
  
 


router.get('/women_salon', (req, res) => {
    
    res.sendFile(path.join(__dirname, "..", 'public', 'src', 'women.html'))
})
router.get("/men_salon&massge", (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'src', 'men.html'))
})
router.get('/cleaning', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'src', 'cleaning.html'))
})
router.get('/helper', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'src', 'helper.html'))
})
router.get('/epc', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'src', 'epc.html'))
})

router.get('/ac&appliance', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'src', 'ac&appliance.html'))
})
router.get('/wall', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'src', 'wall_decor.html'))
})
router.post('/signup', signup)
router.post('/login', signin)




module.exports = router;
