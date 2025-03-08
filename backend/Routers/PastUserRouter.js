const Express = require("express")
const router = Express.Router()
const PastUserController = require("../Controllers/PastUserController")
const { isLoggedIn, isAdmin } = require("../middleware")
router.route("/")
    .get(PastUserController.getAllPastUsers)
    .post(isLoggedIn, isAdmin, PastUserController.createPastUser)

router.route("/:_id")
    .get(isLoggedIn, isAdmin, PastUserController.getOnePastUser)
    .put(isLoggedIn, isAdmin, PastUserController.updatePastUser)
    .delete(isLoggedIn, isAdmin, PastUserController.deletePastUser)

module.exports = router