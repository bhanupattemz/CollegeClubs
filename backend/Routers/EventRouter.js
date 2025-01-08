const Express = require("express")
const router = Express.Router()
const { isLoggedIn, isOrganizers, isAdmin } = require("../middleware")
const EventController = require("../Controllers/EventController")

router.route("/")
    .get(EventController.getAllEvents)
    .post(isLoggedIn, isOrganizers, EventController.createEvent)

router.route("/:_id")
    .get(EventController.getOneEvent)
    .put(isLoggedIn, isOrganizers, EventController.updateEvent)
    .delete(isLoggedIn, isOrganizers, EventController.deleteEvent)

router.route("/update/clubs/:_id")
    .put(isLoggedIn, isOrganizers, EventController.updateEventClubs)

router.route("/register/:_id")
    .put(isLoggedIn, EventController.registerMember)

router.route("/winner/:_id")
    .put(isLoggedIn, isAdmin, EventController.eventWinner)

router.route("/clubs/:_id")
    .get(EventController.getclubEvents)

router.route("/user/:_id")
    .get(isLoggedIn, EventController.getUserEvents)

module.exports = router