const mongoose = require("mongoose")

const pastUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        unique: true,
        required: [true, "Please enter a valid email"],
        match: [/.+\@.+\..+/, "Please enter a valid email from jntua.ac.in"]
    },
    mobileNo: {
        type: Number
    },
    department: {
        type: String,
        enum: ["cse", 'ece', 'eee', 'civ', 'mech', 'chem'],
        required: true
    },
    description: {
        type: String,
        maxlength: 300
    },
    duration: {
        joined: { type: Date, required: true },
        left: { type: Date, required: true, default: Date.now() }
    }

});

const pastUser = mongoose.model('pastUser', pastUserSchema);

module.exports = pastUser