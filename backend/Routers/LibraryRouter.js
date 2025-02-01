const Express = require("express")
const router = Express.Router()
const LibraryController = require("../Controllers/libraryController")
const { isLoggedIn, isAdmin } = require("../middleware")
const { storage } = require("../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage });


router.route("/academic/")
    .get(LibraryController.getAllAcademicBooks)
    .post(upload.single("pdf"), isLoggedIn, isAdmin, LibraryController.createAcademicBook)

router.route("/academic/:_id")
    .get(isLoggedIn, isAdmin, LibraryController.getbookDetails)
    .put(upload.single("pdf"), isLoggedIn, isAdmin, LibraryController.updateacAdemicBook)
    .delete(isLoggedIn, isAdmin, LibraryController.deleteAcademicBook)

module.exports = router