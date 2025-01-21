const Express = require("express")
const router = Express.Router()
const EnvController = require("../Controllers/EnvController")
const { isAdmin, isLoggedIn } = require("../middleware")
router.route("/youtube/latest")
    .get(EnvController.latestYoutubeVideo)


router.route("/map/key")
    .get(EnvController.getMapApiKey)


router.route("/recaptcha/key")
    .get(EnvController.getReCapchaApiKey)

router.route("/razorpay/key")
    .get(EnvController.getRazorPayKey)

router.route("/sca-numbers")
    .get(EnvController.getscajntuaByNumbers)

router.route("/admin/numbers")
    .get(isLoggedIn, isAdmin, EnvController.getAdminNumbers)

router.route("/admin/users/numbers")
    .get(isLoggedIn, isAdmin, EnvController.getAdminMemberData)

router.route("/admin/club_events/numbers")
    .get(isLoggedIn, isAdmin, EnvController.adminGetclubsEvents)

router.route("/admin/donations/numbers")
    .get(isLoggedIn, isAdmin, EnvController.adminGetDonations)
module.exports = router

