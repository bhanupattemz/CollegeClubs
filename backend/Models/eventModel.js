const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "event name is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "event description is required"],
        maxlength: 500
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    conductedClub: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    }],
    timings: {
        starting: { type: Date, required: true },
        ending: { type: Date, required: true }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event
