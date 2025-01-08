const mongoose = require("mongoose");
const FestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your fest name."]
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
    description: {
        type: String,
        required: [true, "fest description is required"],
        maxlength: 500
    },
    registration: {
        starting: { type: Date, required: true },
        ending: { type: Date, required: true }
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FestEvent'
    }],
    isactive: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

FestSchema.post("findOneAndDelete", async (fest, next) => {
    if (fest) {
        for (let event of fest.events) {
            const delEvent = await eventModel.findOneAndDelete({ _id: event })
        }
    }
    next()
})
const Fest = mongoose.model('Fests', FestSchema);
module.exports = Fest