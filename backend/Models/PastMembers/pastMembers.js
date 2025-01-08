const mongoose = require("mongoose")
const User = require("./pastUser")
const studentSchema = new mongoose.Schema({
    admissionNo: {
        type: String,
        required: true
    },
    registeredClubs: [{
        type: String
    }],
    managedClubs: [{
        type: String,
        required: true
    }]

});

const Student = User.discriminator('PastStudent', studentSchema);

module.exports = Student