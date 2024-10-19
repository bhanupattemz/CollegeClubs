const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    occasion: {
        type: String,
        required: [true, "gallery occasion is required"],
        minlength: 10
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    captions: {
        type: String,
        maxlength: 200
    },
    date: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const mainGallery = mongoose.model('MainGallery', gallerySchema);
module.exports = mainGallery