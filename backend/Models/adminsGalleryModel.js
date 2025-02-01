const mongoose = require('mongoose');
const mainGallery = require("./galleryModel")
const gallerySchema = new mongoose.Schema({
    createdBy: {
        type: String
    }
});

const AdminGallery = mainGallery.discriminator('AdminGallery', gallerySchema);

module.exports = AdminGallery