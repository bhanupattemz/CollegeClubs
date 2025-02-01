const mongoose = require('mongoose');

const administrationTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Adminstrator name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: 200,
        maxlength: 500
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    signature: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    mobileNo: {
        type: Number,
        required: [true, "mobile number is required."]
    },
    mail:{
        type: String,
        unique: true,
        required: [true, "Please enter a valid email"],
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    position: {
        type: String,
        required: true,
        enum: ["Principal", "Vice-Principal", "Faculty-Coordinator", "Student-Coordinator"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isactive: {
        type: Boolean,
        default: true
    }
});

const administrationTeam = mongoose.model('AdministrationTeam', administrationTeamSchema);
module.exports = administrationTeam;
