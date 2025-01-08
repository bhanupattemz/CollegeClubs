const mongoose = require("mongoose")
const User = require("./pastUser")
const adminSchema = new mongoose.Schema({
    workedAs: {
        type: String,
        enum: ["studentCoordinator", 'facultyCoordinator'],
        required: true
    }
});

const Admin = User.discriminator('PastAdmin', adminSchema);

module.exports = Admin