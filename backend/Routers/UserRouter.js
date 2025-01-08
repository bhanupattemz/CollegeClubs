const Express = require("express")
const router = Express.Router()
const UserControllers = require("../Controllers/UserController")
const { isLoggedIn, isAdmin } = require("../middleware")
const { storage } = require("../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage });
router.route("/signup/generate")
    .post(UserControllers.genarateSignup)
router.route("/signup/verify")
    .post(UserControllers.verifySignUpMail)

router.route("/signup")
    .post(upload.single('profile'), UserControllers.signup)

router.route("/signin")
    .post(UserControllers.authenticateUser, UserControllers.signin)

router.route("/signout")
    .get(UserControllers.signout)

router.route("/users/password/update")
    .put(isLoggedIn, UserControllers.updatePassword)

router.route("/users/password/reset")
    .post(UserControllers.createPasswordToken)

router.route("/users/password/reset/:token")
    .put(UserControllers.resetPassword)

router.route("/users/:_id")
    .get(isLoggedIn, isAdmin, UserControllers.getOneUser)
    .put(upload.single('profile'), isLoggedIn, isAdmin, UserControllers.adminUpdateUser)
    .delete(isLoggedIn, isAdmin, UserControllers.deleteUser)

router.route("/users")
    .get(isLoggedIn, isAdmin, UserControllers.getAllUsers)
    .delete(isLoggedIn, UserControllers.deleteCurrentUser)

router.route("/profile")
    .get(isLoggedIn, UserControllers.currentUser)
    .put(upload.single('profile'), isLoggedIn, UserControllers.updateUser)

router.route("/admin/signup/generate")
    .post(isLoggedIn, isAdmin, UserControllers.Admingenarate)

router.route("/admin/signup/:_id")
    .post(UserControllers.createAdmin)

router.route("/coordinator/:_id")
    .put(isLoggedIn, isAdmin, UserControllers.makeCoordinator)

module.exports = router