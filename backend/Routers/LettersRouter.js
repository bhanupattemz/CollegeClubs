const Express = require("express")
const router = Express.Router()
const LetterController = require("../Controllers/LetterController")
const { isAdmin, isLoggedIn, isCoordinator, isOrganizers } = require("../middleware")
router.route("/")
    .get(isLoggedIn, isOrganizers, LetterController.getAllLetters)
    .post(isLoggedIn, isAdmin, LetterController.createLetter)

router.route("/:_id")
    .get(isLoggedIn, isOrganizers, LetterController.getOneLetter)
    .put(isLoggedIn, isAdmin, LetterController.updateLetter)
    .delete(isLoggedIn, isAdmin, LetterController.deleteLetter)

module.exports = router