const mongoose = require("mongoose")
const User = require("./UserModel")
const genericUserSchema = new mongoose.Schema({
    isadmin: {
        type: Boolean,
        default: false
    }
});

const GenericUser = User.discriminator('GenericUser', genericUserSchema);

module.exports = GenericUser