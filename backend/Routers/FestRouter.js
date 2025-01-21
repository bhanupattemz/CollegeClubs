const Express = require("express")
const router = Express.Router()
const { isLoggedIn, isOrganizers, isAdmin } = require("../middleware")
const FestController = require("../Controllers/FestController")

router.route("/")
    .get(FestController.getCurrentFests)
    .post(isLoggedIn, isAdmin, FestController.createFest)
router.route("/all")
    .get(isLoggedIn, isAdmin, FestController.getAllFests)

router.route("/events")
    .get(FestController.getAllEvents)

router.route("/events/:_id")
    .get(FestController.getOneEvent)
    .post(isLoggedIn, isAdmin, FestController.createEvent)
    .put(isLoggedIn, isAdmin, FestController.updateEvent)
    .delete(isLoggedIn, isAdmin, FestController.deleteEvent)

router.route("/events/update/clubs/:_id")
    .put(isLoggedIn, isAdmin, FestController.updateEventClubs)

router.route("/events/order/:_id")
    .post(FestController.createRegisterEventOrder)
    
router.route("/events/register/:_id")
    .post(FestController.registerMember)

router.route("/events/winner/:_id")
    .put(isLoggedIn, isAdmin, FestController.eventWinner)

router.route("/:_id")
    .get(isLoggedIn, isAdmin, FestController.getOneFest)
    .put(isLoggedIn, isAdmin, FestController.updateFest)
    .delete(isLoggedIn, isAdmin, FestController.deleteFest)

module.exports = router