const Express = require("express")
const router = Express.Router()
const { isLoggedIn, isOrganizers, isAdmin } = require("../middleware")
const FestController = require("../Controllers/FestController")
const { storage } = require("../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage });
router.route("/")
    .get(FestController.getCurrentFests)
    .post(upload.single("image"), isLoggedIn, isAdmin, FestController.createFest)
router.route("/all")
    .get(isLoggedIn, isAdmin, FestController.getAllFests)

router.route("/events")
    .get(FestController.getAllEvents)

router.route("/events/all")
    .get(isLoggedIn, isAdmin, FestController.AdminGetAllEvents)

router.route("/events/admin/:_id")
    .get(isLoggedIn, isAdmin, FestController.adminGetOneEvent)

router.route("/events/:_id")
    .get(FestController.getOneEvent)
    .post(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), isLoggedIn, isAdmin, FestController.createEvent)
    .put(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), isLoggedIn, isAdmin, FestController.updateEvent)
    .delete(isLoggedIn, isAdmin, FestController.deleteEvent)

router.route("/details/:_id")
    .get(isLoggedIn, isAdmin, FestController.festDetails)

router.route("/events/update/clubs/:_id")
    .put(isLoggedIn, isAdmin, FestController.updateEventClubs)

router.route("/events/order/:_id")
    .post(FestController.createRegisterEventOrder)

router.route("/events/register/:_id")
    .post(FestController.registerMember)

router.route("/events/unregister/:_id")
    .put(isLoggedIn, isAdmin, FestController.unregisterMember)

router.route("/events/winner/:_id")
    .put(isLoggedIn, isAdmin, FestController.eventWinner)

router.route("/members")
    .get(isLoggedIn, isAdmin, FestController.festmembers)

router.route("/members/:_id")
    .get(isLoggedIn, isAdmin, FestController.festmemberDetails)
    .put(isLoggedIn, isAdmin, FestController.festmemberUpdate)
    .delete(isLoggedIn, isAdmin, FestController.deleteFestMember)

router.route("/:_id")
    .get(isLoggedIn, isAdmin, FestController.getOneFest)
    .put(upload.single("image"), isLoggedIn, isAdmin, FestController.updateFest)
    .delete(isLoggedIn, isAdmin, FestController.deleteFest)

module.exports = router