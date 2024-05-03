const path= require('path')
const routes= require("./routes/routes")
const mongoose = require('mongoose');
const User=require('./schemas/userModel')
const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
require("dotenv").config()
const session= require('express-session')


app.use(cookieParser());
app.use(session({
  secret : "NOTESAPI",
  resave: false,
  saveUninitialized:false
}))

// middleware to render the static html css and js file

app.use(express.static( 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'public','icon')));
app.use(express.static(path.join(__dirname, 'public','src')));
app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.set('view engine','ejs')
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection;
db.on('error',err=>{
  console.log(err);
})


db.once('open',()=>{
  console.log("Connected");
})

app.listen(process.env.PORT,()=>{
    console.log("listening")
})




