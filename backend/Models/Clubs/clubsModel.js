const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Club name is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Club description is required"],
        maxlength: 500
    },
    type: {
        type: String,
        enum: ["cultural", "technical", "sports", "social", "academic", "other"],
        required: [true, "Club type is required"]
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    coordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coordinator',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Club = mongoose.model('Club', clubSchema);
module.exports = Club