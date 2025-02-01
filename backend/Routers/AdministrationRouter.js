const Express = require("express")
const router = Express.Router()
const AdministrationController = require("../Controllers/administrationController")
const { isLoggedIn, isAdmin } = require("../middleware")

const { storage } = require("../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage });
router.route("/")
    .get(AdministrationController.getAllAdministrators)
    .post(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'signature', maxCount: 1 }]), isLoggedIn, isAdmin, AdministrationController.createAdministrator)

router.route("/:_id")
    .get(AdministrationController.getOneAdministrator)
    .put(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'signature', maxCount: 1 }]), isLoggedIn, isAdmin, AdministrationController.updateAdministrator)
    .delete(isLoggedIn, isAdmin, AdministrationController.deleteAdministrator)

module.exports = router