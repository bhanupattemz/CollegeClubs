const Express = require("express")
const router = Express.Router()
const EnvController = require("../Controllers/EnvController")

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
module.exports = router

