const Express = require("express")
const router = Express.Router()
const CarouselController = require("../Controllers/CarouselController")
const { isLoggedIn, isAdmin } = require("../middleware")
const { storage } = require("../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage });
router.route("/")
    .get(CarouselController.getAllCarousels)
    .post(upload.single("image"), isLoggedIn, isAdmin, CarouselController.createCarousel)

router.route("/:_id")
    .get(isLoggedIn, isAdmin, CarouselController.carouselDetails)
    .put(upload.single("image"), isLoggedIn, isAdmin, CarouselController.updateCarousel)
    .delete(isLoggedIn, isAdmin, CarouselController.deleteCarousel)

module.exports = router