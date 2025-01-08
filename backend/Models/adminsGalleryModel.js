const mongoose = require('mongoose');
const mainGallery = require("./galleryModel")
const gallerySchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
});

const AdminGallery = mainGallery.discriminator('AdminGallery', gallerySchema);

module.exports = AdminGallery