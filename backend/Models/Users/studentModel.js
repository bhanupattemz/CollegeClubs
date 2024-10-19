const mongoose = require("mongoose")
const User = require("./UserModel")
const studentSchema = new mongoose.Schema({
    admissionNo: {
        type: String
    },
    course: {
        type: String,
        enum: ["b-tech", 'mba', 'mca', 'm-tech']
    },
    branch: {
        type: String,
        enum: ["cse", 'ece', 'eee', 'civ', 'mech', 'chem']
    },
    registeredClubs: [{
        type: String
    }],

});

const Student = User.discriminator('Student', studentSchema);

module.exports = Student