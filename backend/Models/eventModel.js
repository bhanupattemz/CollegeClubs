const mongoose = require('mongoose');
const ClubModel = require("./Clubs/clubsModel")
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "event name is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "event description is required"],
        minlength: 300,
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
    venue: {
        venueName: { type: String, required: true },
        landMark: { type: String, required: true }
    },
    createdAt: {
        type: Date,
        default: Date.now
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
    winner: [{
        admissionNo: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        course: {
            type: String,
            enum: ["b-tech", 'mba', 'mca', 'm-tech'],
            required: true
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true
        },
        academicYear: {
            type: Number,
            required: true
        }
    }]
});



const Event = mongoose.model('Event', eventSchema);
module.exports = Event
