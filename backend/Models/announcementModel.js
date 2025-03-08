const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Announcement title is required"],
        maxlength: 100
    },
    content: {
        type: String,
        required: [true, "Announcement content is required"],
        minlength: 100
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
    date: {
        type: Date,
        default: Date.now
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement