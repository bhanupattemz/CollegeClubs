const Express = require("express")
const router = Express.Router()
const LetterController = require("../Controllers/LetterController")
const { isAdmin, isLoggedIn, isCoordinator, isOrganizers } = require("../middleware")

const { storage } = require("../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage });
router.route("/")
    .get(isLoggedIn, isOrganizers, LetterController.getAllLetters)
    .post(upload.single("pdf"), isLoggedIn, isAdmin, LetterController.createLetter)

router.route("/:_id")
    .get(isLoggedIn, isOrganizers, LetterController.getOneLetter)
    .put(upload.single("pdf"), isLoggedIn, isAdmin, LetterController.updateLetter)
    .delete(isLoggedIn, isAdmin, LetterController.deleteLetter)

module.exports = router