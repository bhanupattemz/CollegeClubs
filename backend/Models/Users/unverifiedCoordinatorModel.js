const mongoose = require("mongoose")

const unverifiedAdmin = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now() + 24 * 60 * 60 * 100
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    }
})

module.exports = mongoose.model("UnverifiedCoordinator", unverifiedAdmin)