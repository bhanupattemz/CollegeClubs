const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    mail: {
        type: String,
        unique: true,
        required: [true, "Please enter a valid email"],
        match: [/.+\@.+\..+/, "Please enter a valid email from jntua.ac.in"]
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: [true, "Please enter a valid role"],
        enum: ['admin', 'coordinator', 'student', 'user']
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
    createdAt: { type: Date, default: Date.now },
    isBlocked: {
        type: Boolean,
        default: false
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User