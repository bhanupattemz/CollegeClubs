const Express = require("express")
const router = Express.Router()
const GalleryController = require("../Controllers/GalleryController")
const { isAdmin, isCoordinator, isOrganizers, isLoggedIn } = require("../middleware")

//club gallery Routers
router.route("/clubs")
    .get(GalleryController.getAllClubPhotos)
    .post(isLoggedIn, isCoordinator, GalleryController.createClubPhoto)

router.route("/clubs/:_id")
    .get(GalleryController.getOneClubPhoto)
    .put(isLoggedIn, isOrganizers, GalleryController.updateClubPhoto)
    .delete(isLoggedIn, isOrganizers, GalleryController.deleteClubPhoto)

//Admin gallery Routers
router.route("/admins")
    .get(GalleryController.getAllAdminPhotos)
    .post(isLoggedIn, isAdmin, GalleryController.createAdminPhoto)

router.route("/admins/:_id")
    .get(GalleryController.getOneAdminPhoto)
    .put(isLoggedIn, isAdmin, GalleryController.updateAdminPhoto)
    .delete(isLoggedIn, isAdmin, GalleryController.deleteAdminPhoto)

//All gallery Router
router.route("/")
    .get(GalleryController.getAllPhotos)

router.route("/:_id")
    .get(GalleryController.getOnePhoto)
    .put(isLoggedIn, isAdmin, GalleryController.updatePhoto)
    .delete(isLoggedIn, isAdmin, GalleryController.deletePhoto)


module.exports = router