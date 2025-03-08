const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const ClubGalleryModel = require("../Models/Clubs/clubGalleryModel")
const AdminGalleryModel = require("../Models/adminsGalleryModel")
const GalleryModel = require("../Models/galleryModel")
const ClubModel = require("../Models/Clubs/clubsModel")
const { deleteFromClodinary } = require("../functionalities")
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
    const bodyData = req.body;
    let clubPhoto = {
        occasion: bodyData.occasion,
        captions: bodyData.captions,
        images: req.files.map(f => ({ public_id: f.filename, url: f.path })),
        club: bodyData.club
    }
    const club = await ClubModel.find({ _id: bodyData.club, "coordinator.details": req.user._id })
    if (!club) {
        throw ExpressError("Club Not Found", 400)
    }
    if (!req.files || req.files.length === 0) {
        throw new ExpressError("At least one image is required", 400);
    }
    const newclubPhoto = new ClubGalleryModel({ ...clubPhoto })
    await newclubPhoto.save()
    res.status(200).json({
        success: true
    })
})

module.exports.updateClubPhoto = WrapAsync(async (req, res, next) => {
    const updatedclubPhoto = req.body;
    const { _id } = req.params;
    const clubPhoto = await ClubGalleryModel.findById(_id);
    if (!clubPhoto) {
        throw new ExpressError("clubPhoto not found", 404);
    }
    // if (!req.user.managedClubs.includes(clubPhoto.club)) {
    //     throw new ExpressError("Not Allow To Add photo", 400)
    // }
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
    const club = await ClubModel.find({ _id: clubPhoto.club, "coordinator.details": req.user._id })
    if (!club) {
        throw ExpressError("Club Not Found", 400)
    }
    clubPhoto.images.map((image) => {
        deleteFromClodinary(image)
    })
    await ClubGalleryModel.findByIdAndDelete(_id)
    let clubs = await ClubModel.find({ "coordinators.details": req.user._id })
    clubs = clubs.map((club) => club._id)
    const allclubPhotos = await ClubGalleryModel.find({
        club: { $in: clubs }
    }).populate({ path: "club", select: "name" });
    res.status(200).json({
        success: true,
        data: allclubPhotos
    })
})


//Gallery of admin Photos 

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
    const bodyData = req.body;
    let adminPhoto = {
        occasion: bodyData.occasion,
        captions: bodyData.captions,
        images: req.files.map(f => ({ public_id: f.filename, url: f.path }))
    }
    if (!req.files || req.files.length === 0) {
        throw new ExpressError("At least one image is required", 400);
    }
    let newGallery;
    if (bodyData.type == "club") {
        const club = await ClubModel.findById(bodyData.club)

        if (!club) {
            adminPhoto.images.map((image) => {
                deleteFromClodinary(image)
            })
            throw new ExpressError("Club is not Found", 400)
        }

        newGallery = new ClubGalleryModel({ ...adminPhoto, club: bodyData.club })
    } else {
        adminPhoto.createdBy = req.user.role
        newGallery = new AdminGalleryModel(adminPhoto)
    }
    await newGallery.save()
    const allphotos = await GalleryModel.find()
    res.status(200).json({
        success: true,
        data: allphotos
    })
})



//Gallery of all Photos
module.exports.getAllPhotos = WrapAsync(async (req, res) => {
    const { key } = req.query
    const Photos = await GalleryModel.find({
        $or: [
            { occasion: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
            { captions: { $regex: new RegExp(key, "i") } }
        ]
    }).sort({ date: -1 }).populate({ path: "club", select: "name" });
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
    const bodyData = req.body;
    const { _id } = req.params;

    const Photo = await GalleryModel.findById(_id);
    if (!Photo) {
        throw new ExpressError("Photo not found", 404);
    }

    let updatedGallery = {
        occasion: bodyData.occasion,
        captions: bodyData.captions,
        images: req.files.map(f => ({ public_id: f.filename, url: f.path })),
    };

    const delImages = JSON.parse(bodyData.delImages || "[]");
    const delPublic_Ids = delImages.map((image) => image.public_id)
    for (let image of Photo.images) {
        if (!delPublic_Ids.includes(image.public_id)) {
            updatedGallery.images.push(image);
        }
    }

    if (Photo.club) {
        const club = await ClubModel.findOne({ _id: Photo.club, "coordinators.details": req.user._id });

        updatedGallery.club = bodyData.club || Photo.club;

        if (!club && req.user.role !== "admin") {
            throw new ExpressError("Didn't have permission to update the gallery", 400);
        }
        await ClubGalleryModel.findByIdAndUpdate(_id, updatedGallery, { runValidators: true });
    } else {
        await AdminGalleryModel.findByIdAndUpdate(_id, updatedGallery, { runValidators: true });
    }
    delImages.forEach(deleteFromClodinary);
    res.status(200).json({ success: true });
});


module.exports.deletePhoto = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const Photo = await GalleryModel.findById(_id);
    if (!Photo) {
        throw new ExpressError("Photo not found", 404);
    }
    Photo.images.map((image) => {
        deleteFromClodinary(image)
    })
    await GalleryModel.findByIdAndDelete(_id)
    const allPhotos = await GalleryModel.find().populate({ path: "club", select: "name" }).sort({ date: -1 })
    res.status(200).json({
        success: true,
        data: allPhotos
    })
})


// coordinator 
module.exports.getCoordinatorGallery = WrapAsync(async (req, res) => {
    const { key } = req.query
    let clubs = await ClubModel.find({ "coordinators.details": req.user._id })
    clubs = clubs.map((club) => club._id)
    const Photos = await ClubGalleryModel.find({
        club: { $in: clubs },
        $or: [
            { occasion: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
            { captions: { $regex: new RegExp(key, "i") } }
        ]
    }).sort({ date: -1 }).populate({ path: "club", select: "name" });
    res.status(200).json({
        success: true,
        data: Photos
    })
})
