const Express = require("express")
const router = Express.Router()
const UserControllers = require("../Controllers/UserControllers")
router.route("/")
    .get(UserControllers.first)


module.exports = router