const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const ClubGalleryModel = require("../Models/Clubs/clubGalleryModel")
const AdminGalleryModel = require("../Models/adminsGalleryModel")
const GalleryModel = require("../Models/galleryModel")

module.exports.getAllClubPhotos = WrapAsync(async (req, res) => {
    const clubPhotos = await ClubGalleryModel.find({
    });
    res.status(200).json({
        success: true,
        data: clubPhotos
    })
})

module.exports.getOneClubPhoto = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const clubPhoto = await ClubGalleryModel.find({ club: _id }).sort({ date: -1 })
    if (!clubPhoto) {
        throw new ExpressError("clubPhoto not found", 404);
    }
    res.status(200).json({
        success: true,
        data: clubPhoto
    })
})


module.exports.createClubPhoto = WrapAsync(async (req, res, next) => {
    const clubPhoto = req.body;
    if (!req.user.managedClubs.includes(clubPhoto.club)) {
        throw new ExpressError("Not Allow To Add photo", 400)
    }
    const newclubPhoto = new ClubGalleryModel({ ...clubPhoto })
    await newclubPhoto.save()
    const allclubPhotos = await ClubGalleryModel.find()
    res.status(200).json({
        success: true,
        data: allclubPhotos
    })
})

module.exports.updateClubPhoto = WrapAsync(async (req, res, next) => {
    const updatedclubPhoto = req.body;
    const { _id } = req.params;
    const clubPhoto = await ClubGalleryModel.findById(_id);
    if (!clubPhoto) {
        throw new ExpressError("clubPhoto not found", 404);
    }
    if (!req.user.managedClubs.includes(clubPhoto.club)) {
        throw new ExpressError("Not Allow To Add photo", 400)
    }
    await ClubGalleryModel.findByIdAndUpdate(_id, { ...updatedclubPhoto, createdBy: req.user._id, club: req.user.managedClub }, { new: true, runValidators: true })
    const allclubPhotos = await ClubGalleryModel.find()
    res.status(200).json({
        success: true,
        data: allclubPhotos
    })
})

module.exports.deleteClubPhoto = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const clubPhoto = await ClubGalleryModel.findById(_id);
    if (!clubPhoto) {
        throw new ExpressError("clubPhoto not found", 404);
    }
    if (clubPhoto.createdBy !== req.user._id && req.user.role !== "admin") {
        throw new ExpressError("Not Allowed Delete", 400)
    }
    await ClubGalleryModel.findByIdAndDelete(_id)
    const allclubPhotos = await ClubGalleryModel.find()
    res.status(200).json({
        success: true,
        data: allclubPhotos
    })
})


//Gallery of admin Photos 
module.exports.getAllAdminPhotos = WrapAsync(async (req, res) => {
    const { key } = req.query
    const adminPhotos = await AdminGalleryModel.find({
        $or: [
            { occasion: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
            { captions: { $regex: new RegExp(key, "i") } }
        ]
    });
    res.status(200).json({
        success: true,
        data: adminPhotos
    })
})

module.exports.getOneAdminPhoto = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const adminPhoto = await AdminGalleryModel.findById(_id)
    if (!adminPhoto) {
        throw new ExpressError("adminPhoto not found", 404);
    }
    res.status(200).json({
        success: true,
        data: adminPhoto
    })
})


module.exports.createAdminPhoto = WrapAsync(async (req, res, next) => {
    const adminPhoto = req.body;
    const newadminPhoto = new AdminGalleryModel({ ...adminPhoto })
    await newadminPhoto.save()
    const alladminPhotos = await AdminGalleryModel.find()
    res.status(200).json({
        success: true,
        data: alladminPhotos
    })
})

module.exports.updateAdminPhoto = WrapAsync(async (req, res, next) => {
    const updatedadminPhoto = req.body;
    const { _id } = req.params;
    const adminPhoto = await AdminGalleryModel.findById(_id);
    if (!adminPhoto) {
        throw new ExpressError("adminPhoto not found", 404);
    }
    await AdminGalleryModel.findByIdAndUpdate(_id, { ...updatedadminPhoto }, { new: true, runValidators: true })
    const alladminPhotos = await AdminGalleryModel.find()
    res.status(200).json({
        success: true,
        data: alladminPhotos
    })
})

module.exports.deleteAdminPhoto = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const adminPhoto = await AdminGalleryModel.findById(_id);
    if (!adminPhoto) {
        throw new ExpressError("adminPhoto not found", 404);
    }
    await AdminGalleryModel.findByIdAndDelete(_id)
    const alladminPhotos = await AdminGalleryModel.find()
    res.status(200).json({
        success: true,
        data: alladminPhotos
    })
})




//Gallery of all Photos
module.exports.getAllPhotos = WrapAsync(async (req, res) => {
    const Photos = await GalleryModel.find({ club: undefined }).sort({ date: -1 });
    res.status(200).json({
        success: true,
        data: Photos
    })
})

module.exports.getOnePhoto = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const Photo = await GalleryModel.findById(_id)
    if (!Photo) {
        throw new ExpressError("Photo not found", 404);

    }
    res.status(200).json({
        success: true,
        data: Photo
    })
})

module.exports.updatePhoto = WrapAsync(async (req, res, next) => {
    const updatedPhoto = req.body;
    const { _id } = req.params;
    const Photo = await GalleryModel.findById(_id);
    if (!Photo) {
        throw new ExpressError("Photo not found", 404);
    }
    await GalleryModel.findByIdAndUpdate(_id, updatedPhoto, { new: true, runValidators: true })
    const allPhotos = await GalleryModel.find()
    res.status(200).json({
        success: true,
        data: allPhotos
    })
})

module.exports.deletePhoto = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const Photo = await GalleryModel.findById(_id);
    if (!Photo) {
        throw new ExpressError("Photo not found", 404);
    }
    await GalleryModel.findByIdAndDelete(_id)
    const allPhotos = await GalleryModel.find()
    res.status(200).json({
        success: true,
        data: allPhotos
    })
})