const mongoose = require('mongoose');

const bookingDetails = new mongoose.Schema({
    order_name:{
        type: String,
        
    } ,
    
    price: {
        type: String,
        required: true
    },
    
});

const bookingDetail = new mongoose.model("BookingDetails", bookingDetails)

module.exports = bookingDetail;