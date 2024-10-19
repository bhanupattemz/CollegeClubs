const mongoose = require("mongoose")

const pastUserSchema = new mongoose.Schema({
    mail: {
        type: String,
        unique: true,
        required: [true, "Please enter a valid email"],
        match: [/.+\@.+\..+/, "Please enter a valid email from jntua.ac.in"]
    },
    role: {
        type: String,
        required: [true, "Please enter a valid role"],
        enum: ['admin', 'coordinator', 'member']
    },
    personalInformation: {
        firstname: { type: String },
        lastname: { type: String },
        profile: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
        personalMail: { type: String, match: [/.+\@.+\..+/, "Please enter a valid personal email"] },
        mobileNo: { type: String },
        gender: { type: String, enum: ["male", 'female', 'others'] },
        DOB: { type: Date }
    },
    department: {
        type: String,
        enum: ["cse", 'ece', 'eee', 'civ', 'mech', 'chem'],
        required: true
    },
    duration: {
        joined: { type: Date, required: true },
        left: { type: Date, required: true }
    }

});

const pastUser = mongoose.model('pastUser', pastUserSchema);

module.exports = pastUser