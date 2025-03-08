const Express = require("express")
const router = Express.Router()
const ClubController = require("../Controllers/ClubController")
const { isLoggedIn, isAdmin, isOrganizers, isCoordinator } = require("../middleware")
const { storage } = require("../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage });
router.route("/")
    .get(ClubController.getAllClubs)
    .post(upload.fields([{ name: 'bannerImage', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), isLoggedIn, isAdmin, ClubController.createClub)
router.route("/coordinator")
    .get(isLoggedIn, isCoordinator, ClubController.getCoordinatorClubs)

router.route("/:_id")
    .get(ClubController.getOneClub)
    .put(upload.fields([{ name: 'bannerImage', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), isLoggedIn, isOrganizers, ClubController.updateClub)
    .delete(isLoggedIn, isAdmin, ClubController.deleteClub)

router.route("/updateCoordinator/:_id")
    .put(isLoggedIn, isAdmin, ClubController.updateCoordinators)

router.route("/members/:_id")
    .get(isLoggedIn, isOrganizers, ClubController.getClubMembers)

router.route("/register/:_id")
    .put(isLoggedIn, ClubController.registerMember)


router.route("/unregister/:_id")
    .put(isLoggedIn, isOrganizers, ClubController.unregisterMember)

router.route("/update/register")
    .put(isLoggedIn, isAdmin, ClubController.updateAllRegistrationTime)

router.route("/update/register/:_id")
    .put(isLoggedIn, isAdmin, ClubController.updateSingleRegistrationTime)

router.route("/mail/coordinators")
    .get(isLoggedIn, isAdmin, ClubController.sendClubMembersToCoordinator)

router.route("/user/:_id")
    .get(isLoggedIn, ClubController.getUserClubs)

module.exports = router