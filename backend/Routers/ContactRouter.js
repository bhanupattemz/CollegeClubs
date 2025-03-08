const Express = require("express")
const router = Express.Router()
const ContactController = require("../Controllers/ContactController")
const { isLoggedIn, isAdmin } = require("../middleware")
router.route("/")
    .get(isLoggedIn, isAdmin, ContactController.getAllContactMsgs)
    .post(ContactController.createContactMsg)

router.route("/:_id")
    .delete(isLoggedIn, isAdmin, ContactController.deleteContactMsg)

module.exports = router