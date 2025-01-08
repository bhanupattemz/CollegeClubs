const Express = require("express")
const router = Express.Router()
const DonationController = require("../Controllers/DonationController")
const { isLoggedIn, isAdmin } = require("../middleware")

router.route("/top")
    .get(DonationController.getTopDonars)
router.route("/order")
    .post(DonationController.createDonationOrder)
router.route("/")
    .get(isLoggedIn, isAdmin, DonationController.getAllDonars)
    .post(DonationController.createDonar)

router.route("/:_id")
    .get(DonationController.getOneDonar)
    .put(isLoggedIn, isAdmin, DonationController.updateDonar)
    .delete(isLoggedIn, isAdmin, DonationController.deleteDonar)

module.exports = router