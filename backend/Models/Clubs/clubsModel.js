const mongoose = require('mongoose');
const EventModel = require("../eventModel")
const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Club name is required"],
        unique: true
    },
    bannerImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    logo: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    skills: [{
        type: String,
        required: [true, "Atleast one Skill RequiredF is required"]
    }],
    description: {
        type: String,
        required: [true, "Club description is required"],
        minlength: 300,
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
    timings: [{
        day: {
            type: String,
            required: true,
            enum: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        },
        time: { type: String, require: true }

    }],
    venue: {
        venueName: {
            type: String,
            required: true
        },
        landMark: {
            type: String,
            required: true
        }
    },
    registrationTiming: {
        starting: { type: Date, required: true },
        ending: { type: Date, required: true }
    },
    coordinators: [
        {
            details: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            },
            coordinatorAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

clubSchema.post("findOneAndDelete", async (club, next) => {
    if (club) {
        try {
            const events = await EventModel.find({
                conductedClub: { $in: [club._id] }
            });
            events.map(async (event) => {
                await EventModel.findByIdAndUpdate(
                    event._id,
                    { $pull: { conductedClub: club._id } }
                )
            })
        }
        catch (err) {
            next(err)
        }
    }
    next()
})

const Club = mongoose.model('Club', clubSchema);
module.exports = Club