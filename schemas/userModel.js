const mongoose = require('mongoose');

const loginData = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    } ,
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile_number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
});

const LoginDetail = new mongoose.model("LoginDetail", loginData)

module.exports = LoginDetail;