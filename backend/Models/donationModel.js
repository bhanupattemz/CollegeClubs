const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Donor name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: 500
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
    amount: {
        type: Number,
        required: [true, "Donation amount is required"],
        min: 0 
    },
    date: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    }
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
