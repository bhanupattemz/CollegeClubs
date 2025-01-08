const Express = require("express")
const router = Express.Router()
const ClubController = require("../Controllers/ClubController")
const { isLoggedIn, isAdmin } = require("../middleware")
router.route("/")
    .get(ClubController.getAllClubs)
    .post(isLoggedIn, isAdmin, ClubController.createClub)

router.route("/:_id")
    .get(ClubController.getOneClub)
    .put(isLoggedIn, isAdmin, ClubController.updateClub)
    .delete(isLoggedIn, isAdmin, ClubController.deleteClub)

router.route("/updateCoordinator/:_id")
    .put(isLoggedIn, isAdmin, ClubController.updateCoordinators)

router.route("/register/:_id")
    .put(isLoggedIn, ClubController.registerMember)

router.route("/update/register")
    .put(isLoggedIn, isAdmin, ClubController.updateAllRegistrationTime)

router.route("/update/register/:_id")
    .put(isLoggedIn, isAdmin, ClubController.updateSingleRegistrationTime)

router.route("/mail/coordinators")
    .get(isLoggedIn, isAdmin, ClubController.sendClubMembersToCoordinator)

router.route("/user/:_id")
    .get(isLoggedIn, ClubController.getUserClubs)

module.exports = router