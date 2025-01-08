const mongoose = require('mongoose');

const CarouselSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    link: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Carousel = mongoose.model('Carousel', CarouselSchema);
module.exports = Carousel;
