const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "letter title is required"],
        maxlength: 100
    },
    content: {
        type: String,
        required: [true, "letter content is required"],
        minlength: 10
    },
    pdf:
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
    ,
    date: {
        type: Date,
        default: Date.now
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    }
});

const Letter = mongoose.model('Letter', letterSchema);
module.exports = Letter