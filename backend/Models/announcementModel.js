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
        minlength: 10
    },
    images:[
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.export = Announcement