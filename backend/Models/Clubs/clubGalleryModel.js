const mongoose = require('mongoose');
const mainGallery = require("../mainGalleryModel")
const gallerySchema = new mongoose.Schema({
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    }
});

const culbGallery = mainGallery.discriminator('ClubGallery', gallerySchema);

module.exports = culbGallery