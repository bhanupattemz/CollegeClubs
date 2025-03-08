const Express = require("express")
const router = Express.Router()
const { isLoggedIn, isOrganizers, isAdmin, isCoordinator } = require("../middleware")
const EventController = require("../Controllers/EventController")
const { storage } = require("../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage });

router.route("/")
    .get(EventController.getActiveEvents)

router.route("/admin")
    .get(isLoggedIn, isAdmin, EventController.getAllEvents)

router.route("/coordinator")
    .get(isLoggedIn, isCoordinator, EventController.getCoordinatorEvents)

// router.route("/admin/non-active")
//     .get(isLoggedIn, isAdmin, EventController.getNonActiveEvents)
//     .put(isLoggedIn, isOrganizers, EventController.updateNonActiveEvent)
//     .delete(isLoggedIn, isOrganizers, EventController.deleteNonActiveEvent)

router.route("/create/:club_id")
    .post(upload.single('image'), isLoggedIn, isOrganizers, EventController.createEvent)

router.route("/:_id")
    .get(EventController.getOneEvent)
    .put(upload.single('image'), isLoggedIn, isOrganizers, EventController.updateEvent)
    .delete(isLoggedIn, isOrganizers, EventController.deleteEvent)

router.route("/set/:_id")
    .post(isLoggedIn, isAdmin, EventController.setEvent)

router.route("/update/clubs/:_id")
    .put(isLoggedIn, isOrganizers, EventController.updateEventClubs)

router.route("/register/:_id")
    .put(isLoggedIn, EventController.registerMember)

router.route("/unregister/:_id")
    .put(isLoggedIn, isOrganizers, EventController.unregisterMember)

router.route("/members/:_id")
    .get(isLoggedIn, isOrganizers, EventController.getEventMembers)

router.route("/winner/:_id")
    .put(isLoggedIn, isAdmin, EventController.eventWinner)

router.route("/clubs/:_id")
    .get(EventController.getclubEvents)

router.route("/admin/:_id")
    .get(isLoggedIn, isAdmin, EventController.adminGetOneEvent)

router.route("/user/:_id")
    .get(isLoggedIn, EventController.getUserEvents)


module.exports = router