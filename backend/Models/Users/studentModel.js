const mongoose = require("mongoose")
const User = require("./UserModel")
const studentSchema = new mongoose.Schema({
    admissionNo: {
        type: String,
        required: true,
        uniquie: true
    },
    course: {
        type: String,
        enum: ["b-tech", 'mba', 'mca', 'm-tech'],
        required: true
    },
    branch: {
        type: String,
        enum: ["cse", 'ece', 'eee', 'civ', 'mech', 'chem'],
        required: true
    },
    description: {
        type: String,
        minlength:300,
        maxlength:500
    },
    academicYear: {
        type: Number,
        required: true
    }

});


const Student = User.discriminator('Student', studentSchema);

module.exports = Student