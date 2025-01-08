const Express = require("express")
const router = Express.Router()
const AdministrationController = require("../Controllers/administrationController")
const { isLoggedIn, isAdmin } = require("../middleware")
router.route("/")
    .get(AdministrationController.getAllAdministrators)
    .post(isLoggedIn, isAdmin, AdministrationController.createAdministrator)

router.route("/:_id")
    .get(AdministrationController.getOneAdministrator)
    .put(isLoggedIn, isAdmin, AdministrationController.updateAdministrator)
    .delete(isLoggedIn, isAdmin, AdministrationController.deleteAdministrator)

module.exports = router