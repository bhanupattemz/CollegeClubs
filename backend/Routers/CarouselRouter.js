const Express = require("express")
const router = Express.Router()
const CarouselController = require("../Controllers/CarouselController")
const { isLoggedIn, isAdmin } = require("../middleware")
router.route("/")
    .get(CarouselController.getAllCarousels)
    .post(isLoggedIn, isAdmin, CarouselController.createCarousel)

router.route("/:_id")
    .put(isLoggedIn, isAdmin, CarouselController.updateCarousel)
    .delete(isLoggedIn, isAdmin, CarouselController.deleteCarousel)

module.exports = router