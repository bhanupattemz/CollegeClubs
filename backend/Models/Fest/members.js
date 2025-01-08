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
        required: [true, ""],
        match: [/.+\@.+\..+/, "Please enter a valid email."]
    },
    phone: {
        type: Number,
        required: [true, "Please enter your phone number."],
        length: [10, "Phone Number must be 10 numbers."]
    },
    course: {
        type: String,
        required: [true, "Please enter department."]
    },
    year:{
        type:Number,
        required:[true,"please enter year of studying."],
        min:1,
        max:4
    }
});


const Student = mongoose.model('FestMembers', studentSchema);

module.exports = Student