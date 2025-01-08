const Express = require("express")
const router = Express.Router()
const LibraryController = require("../Controllers/libraryController")
const { isLoggedIn, isAdmin } = require("../middleware")


router.route("/academic/")
    .get(LibraryController.getAllAcademicBooks)
    .post(isLoggedIn, isAdmin, LibraryController.createAcademicBook)

router.route("/academic/:_id")
    .put(isLoggedIn, isAdmin, LibraryController.updateacAdemicBook)
    .delete(isLoggedIn, isAdmin, LibraryController.deleteAcademicBook)

module.exports = router