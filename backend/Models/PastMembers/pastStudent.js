const mongoose = require("mongoose")
const User = require("./pastUser")
const studentSchema = new mongoose.Schema({
    admissionNo: {
        type: String,
        required: true
    },
    managedClub: [
        {
            name: { type: String, required: true},
            duration: {
                joined: { type: Date, required: true },
                left: { type: Date, required: true, default: Date.now() }
            }
        }
    ]
});

const Student = User.discriminator('PastStudent', studentSchema);

module.exports = Student