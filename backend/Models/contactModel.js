const { request, text } = require('express');
const mongoose = require('mongoose');
const CarouselSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required. Please enter your full name."]
    },
    mail: {
        type: String,
        required: [true, "Email is required. Please provide a valid email address."]
    },
    mobileNo: {
        type: Number,
        required: [true, "Phone number is required. Please enter your contact number."]
    },
    subject: {
        type: String,
        required: [true, "Subject is required. Please specify the purpose of your message."]
    },
    message: {
        type: String, 
        required: [true, "Message is required. Please enter the details of your query."]
    }
});


const Carousel = mongoose.model('Contact', CarouselSchema);
module.exports = Carousel;
