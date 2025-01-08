const mongoose = require("mongoose")

const unverifiedUser = new mongoose.Schema({
    mail: {
        type: String,
        unique: true,
        required: [true, "Please enter a valid email"],
        match: [/.+\@.+\..+/, "Please enter a valid email from jntua.ac.in"]
    },
    otp: {
        type: Number,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now() + 15 * 60 * 100
    },
    isverified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: [true, "Please enter a valid role"],
        enum: ["student", "general"]
    }
})

module.exports = mongoose.model("UnverifiedUser", unverifiedUser)