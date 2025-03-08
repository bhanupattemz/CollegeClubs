const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Donor name is required"],
    },
    amount: {
        type: Number,
        required: [true, "Donation amount is required"],
        min: 0
    },
    mail: {
        type: String,
        required: [true, "Please enter a valid email"],
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    mobileNo: {
        type: Number,
        length: 10
    },
    note: {
        type: String,
        max: 200
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    },
    paymentInfo: {
        paymentId: { type: String, required: true },
        status: { type: String, required: true },
        payedAt: { type: Date, required: true, default: Date.now() }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
