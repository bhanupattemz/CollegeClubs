const Express = require("express")
const router = Express.Router()
const EnvController = require("../Controllers/EnvController")
const { isAdmin, isLoggedIn, isCoordinator } = require("../middleware")
router.route("/youtube/latest")
    .get(EnvController.latestYoutubeVideo)


router.route("/map/key")
    .get(EnvController.getMapApiKey)


router.route("/recaptcha/key")
    .get(EnvController.getReCapchaApiKey)

router.route("/razorpay/key")
    .get(EnvController.getRazorPayKey)

router.route("/sca-numbers")
    .get(EnvController.getCollegeClubsByNumbers)

router.route("/admin/numbers")
    .get(isLoggedIn, isAdmin, EnvController.getAdminNumbers)

router.route("/admin/users/numbers")
    .get(isLoggedIn, isAdmin, EnvController.getAdminMemberData)

router.route("/admin/club_events/numbers")
    .get(isLoggedIn, isAdmin, EnvController.adminGetclubsEvents)

router.route("/admin/donations/numbers")
    .get(isLoggedIn, isAdmin, EnvController.adminGetDonations)

router.route("/coordinator/numbers")
    .get(isLoggedIn, isCoordinator, EnvController.getCoordinatorNumbers)

router.route("/coordinator/donations/numbers")
    .get(isLoggedIn, isCoordinator, EnvController.getCoordinatorDonations)

router.route("/coordinator/donations/top")
    .get(isLoggedIn, isCoordinator, EnvController.getCoordinatorTopDonations)

router.route("/coordinator/members/numbers")
    .get(isLoggedIn, isCoordinator, EnvController.getCoordinatorMemberData)

router.route("/coordinator/club_events/numbers")
    .get(isLoggedIn, isCoordinator, EnvController.coordinatorGetclubsEvents)

module.exports = router

