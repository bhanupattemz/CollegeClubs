const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const AnnouncementModel = require("../Models/announcementModel")
const { deleteFromClodinary } = require("../functionalities")

module.exports.getAllAnnouncements = WrapAsync(async (req, res) => {
    let Announcements;
    const { key } = req.query
    if (req.user && ["coordinator", "admin"].includes(req.user.role)) {
        Announcements = await AnnouncementModel.find({
            $or: [
                { title: { $regex: new RegExp(key, "i") } },
                { _id: key && key.length === 24 ? key : undefined },
                { content: { $regex: new RegExp(key, "i") } },
                { visibility: { $regex: new RegExp(key, "i") } }
            ]
        }).sort({ date: -1 });
    } else {
        Announcements = await AnnouncementModel.find({
            visibility: "public",
            $or: [
                { title: { $regex: new RegExp(key, "i") } },
                { _id: key && key.length === 24 ? key : undefined },
            ]
        }).sort({ date: -1 })
    }
    res.status(200).json({
        success: true,
        data: Announcements
    })
})


module.exports.getTopAnnouncements = WrapAsync(async (req, res) => {
    let Announcements;
    if (req.user && ["coordinator", "admin"].includes(req.user.role)) {
        Announcements = await AnnouncementModel.find({}).sort({ date: -1 });
    } else {
        Announcements = await AnnouncementModel.find({ visibility: "public" }).sort({ date: -1 }).limit(10)
    }
    res.status(200).json({
        success: true,
        data: Announcements
    })
})


module.exports.getOneAnnouncement = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const Announcements = await AnnouncementModel.findById(_id)
    if (!Announcements) {
        throw new ExpressError("Announcements not found", 404);
    }
    if (Announcements.visibility === "private" && !req.user.role in ["coordinator", "admin"]) {
        throw new ExpressError("Restriced data", 401);
    }
    res.status(200).json({
        success: true,
        data: Announcements
    })
})


module.exports.createAnnouncement = WrapAsync(async (req, res, next) => {
    const bodydata = req.body;
    let pdf;
    if (req.file) {
        pdf = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    }
    let announcement = {
        title: bodydata.title,
        content: bodydata.content,
        pdf: pdf,
        visibility: bodydata.visibility
    }
    const newannouncement = AnnouncementModel({ ...announcement, createdBy: req.user })
    await newannouncement.save()
    const allAnnouncements = await AnnouncementModel.find().sort({ date: -1 })
    res.status(200).json({
        success: true,
        data: allAnnouncements
    })
})

module.exports.updateAnnouncement = WrapAsync(async (req, res, next) => {
    const bodydata = req.body;
    const { _id } = req.params;
    const Announcement = await AnnouncementModel.findById(_id)
    if (!Announcement) {
        throw new ExpressError("Announcements not found", 404);
    }
    let pdf;
    if (req.file) {
        deleteFromClodinary(Announcement.pdf)
        pdf = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    } else {
        pdf = Announcement.pdf
    }
    let updatedAnnouncement = {
        title: bodydata.title,
        content: bodydata.content,
        pdf: pdf,
        visibility: bodydata.visibility
    }
    await AnnouncementModel.findByIdAndUpdate(_id, updatedAnnouncement, { new: true, runValidators: true })
    const allAnnouncements = await AnnouncementModel.find().sort({ date: -1 })
    res.status(200).json({
        success: true,
        data: allAnnouncements
    })
})

module.exports.deleteAnnouncement = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const Announcement = await AnnouncementModel.findById(_id)
    if (!Announcement) {
        throw new ExpressError("Announcements not found.", 404);
    }
    if (Announcement.createdBy !== req.user && req.user.role !== "admin") {
        throw new ExpressError("You are not allowed to delete this announcement.", 403)
    }
    await AnnouncementModel.findByIdAndDelete(_id)
    const allAnnouncements = await AnnouncementModel.find().sort({ date: -1 })
    res.status(200).json({
        success: true,
        data: allAnnouncements
    })
})