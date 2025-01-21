const mongoose = require("mongoose")

const unverifiedAdmin = new mongoose.Schema({
    mail: {
        type: String,
        unique: true,
        required: [true, "Please enter a valid email"],
        match: [/.+\@.+\..+/, "Please enter a valid email from jntua.ac.in"]
    },
    workedAs: {
        type: String,
        enum: ["studentCoordinator", 'facultyCoordinator'],
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now() +  24 * 60 * 60 * 100
    }
})

module.exports = mongoose.model("UnverifiedAdmin", unverifiedAdmin)