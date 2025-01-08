const mongoose = require('mongoose');

const GeneralBookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ["fiction", "non-fiction", "biography", "self-help", "literature", "comics", "novel", "graphic novel", "magazine"]
    },
    publisher: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    pdf: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const GeneralBook = mongoose.model('GeneralBooks', GeneralBookSchema);
module.exports = GeneralBook;
