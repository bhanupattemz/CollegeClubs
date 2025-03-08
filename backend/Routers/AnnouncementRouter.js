const Express = require("express")
const Router = Express.Router()
const AnnouncementController = require("../Controllers/AnnouncementController")
const { isLoggedIn, isOrganizers } = require("../middleware")
const { storage } = require("../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage });
Router.route("/")
    .get(AnnouncementController.getAllAnnouncements)
    .post(upload.single("pdf"), isLoggedIn, isOrganizers, AnnouncementController.createAnnouncement)
Router.route("/top")
    .get(AnnouncementController.getTopAnnouncements)
Router.route("/:_id")
    .get(AnnouncementController.getOneAnnouncement)
    .put(upload.single("pdf"), isLoggedIn, isOrganizers, AnnouncementController.updateAnnouncement)
    .delete(isLoggedIn, isOrganizers, AnnouncementController.deleteAnnouncement)

module.exports = Router