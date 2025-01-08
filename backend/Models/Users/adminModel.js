const mongoose = require("mongoose")
const User = require("./UserModel")


const adminSchema = new mongoose.Schema({
    department: {
        type: String,
        enum: ["cse", 'ece', 'eee', 'civ', 'mech', 'chem'],
        required: true
    },
    description: {
        type: String,
        maxlength: 300
    },
    workedAs: {
        type: String,
        enum: ["studentCoordinator", 'facultyCoordinator'],
        required: true
    }
});


const Admin = User.discriminator('Admin', adminSchema);
module.exports = Admin