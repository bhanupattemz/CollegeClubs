const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your full name."]
    },
    college: {
        type: String,
        required: [true, "Please enter your college name."]
    },
    mail: {
        type: String,
        required: [true, "Please enter you mail"],
        match: [/.+\@.+\..+/, "Please enter a valid email."]
    },
    mobileNo: {
        type: Number,
        required: [true, "Please enter your phone number."],
        length: [10, "Phone Number must be 10 numbers."]
    },
    course: {
        type: String,
        enum: ["b-tech", 'mba', 'mca', 'm-tech'],
        required: [true, "Please enter department."]
    },
    branch: {
        type: String,
        enum: ["cse", 'ece', 'eee', 'civ', 'mech', 'chem'],
        required: true
    },
    academicYear: {
        type: Number,
        required: [true, "please enter year of studying."],
        min: 1,
        max: 4
    },
    paymentInfo: {
        paymentId: { type: String, required: true },
        status: { type: String, required: true },
        payedAt: { type: Date, default: Date.now() }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Student = mongoose.model('FestMembers', studentSchema);

module.exports = Student