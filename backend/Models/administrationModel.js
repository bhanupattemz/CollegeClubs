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
    },
    period: {
        starting: { type: Date, default: Date.now },
        ending: { type: Date }
    }
});

const administrationTeam = mongoose.model('AdministrationTeam', administrationTeamSchema);
module.exports = administrationTeam;
