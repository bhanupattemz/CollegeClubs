const Express = require("express")
const router = Express.Router()
const certificateController = require("../Controllers/CertificatesController")
const { isLoggedIn, isAdmin } = require("../middleware")

router.route("/")
    .get(isLoggedIn, isAdmin, certificateController.getAllCertificates)
    .post(isLoggedIn, isAdmin, certificateController.createCertificate)

router.route("/:_id")
    .get(isLoggedIn, certificateController.getUserCertificates)
    .put(isLoggedIn, isAdmin, certificateController.updateCertificate)
    .delete(isLoggedIn, isAdmin, certificateController.deleteCertificate)

module.exports = router 