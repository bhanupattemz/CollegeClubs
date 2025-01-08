const mongoose = require('mongoose');

const AcademicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true,
        enum: ["btech"]
    },
    branch: {
        type: String,
        required: true,
        enum: ["cse", "mech", "ece", "eee", "civil", "chem"]
    },
    year: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    sem: {
        type: Number,
        required: true,
        min: 1,
        max: 2
    },
    type: {
        type: String,
        required: true,
        enum: ["books", "papers"]
    },
    subject: {
        type: String,
        required: true
    },
    pdf: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

const Academic = mongoose.model('AcademicBooks', AcademicSchema);
module.exports = Academic;
