const mongoose = require('mongoose');
const MemberModel = require("./members");
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "event name is required"]
    },
    subheading: {
        type: String,
        required: [true, "event subheading is required"],
        maxlength: 100
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: [true, "event description is required"],
        min: 250,
        maxlength: 800
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FestMembers'
    }],
    conductedClub: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    }],
    registration: {
        starting: { type: Date, required: true },
        ending: { type: Date, required: true }
    },
    timings: {
        starting: { type: Date, required: true },
        ending: { type: Date, required: true }
    },
    venue: {
        venueName: { type: String, required: true },
        landMark: { type: String, required: true }
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
    pdf: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    prizes: [{
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        certificate: { type: Boolean, required: true }
    }],
    winner: [{
        name: {
            type: String,
            required: [true, "Please enter your full name."]
        },
        college: {
            type: String,
            required: [true, "Please enter your college name."]
        },
        mail: {
            type: String,
            required: [true, ""],
            match: [/.+\@.+\..+/, "Please enter a valid email."]
        },
        mobileNo: {
            type: Number,
            required: [true, "Please enter your phone number."],
            length: [10, "Phone Number must be 10 numbers."]
        },
        course: {
            type: String,
            required: [true, "Please enter course."]
        },
        branch: {
            type: String,
            enum: ["cse", 'ece', 'eee', 'civ', 'mech', 'chem'],
            required: true
        },
        academicYear: {
            type: Number,
            required: [true, "please enter year of studying."],
            min: 1,
            max: 4
        },
        gender: {
            type: String,
            enum: ["male", 'female', 'others'],
            required: true
        }
    }]
});

eventSchema.post("findOneAndDelete", async (event, next) => {
    if (event) {
        for (let member of event.members) {
            const delMember = await MemberModel.findByIdAndDelete(member)
        }
    }
    next()
})

const Event = mongoose.model('FestEvent', eventSchema);
module.exports = Event
