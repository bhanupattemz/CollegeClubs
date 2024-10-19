const mongoose = require("mongoose")
const Student = require("./studentModel")
const coordinatorSchema = new mongoose.Schema({
    managedClubs: [{
        type: String
    }],
    description: {
        type: String,
        maxlength: 300
    }
});

const Coordinator = Student.discriminator('Coordinator', coordinatorSchema);
module.exports = Coordinator