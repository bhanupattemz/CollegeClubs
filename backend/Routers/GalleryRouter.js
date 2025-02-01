const Express = require("express")
const router = Express.Router()
const GalleryController = require("../Controllers/GalleryController")
const { isAdmin, isCoordinator, isOrganizers, isLoggedIn } = require("../middleware")

const { storage } = require("../config/cloudinary")
const multer = require("multer")
const upload = multer({ storage });

//club gallery Routers
router.route("/clubs")
    .get(GalleryController.getAllClubPhotos)
    .post(upload.array("images"), isLoggedIn, isCoordinator, GalleryController.createClubPhoto)

router.route("/clubs/:_id")
    .get(GalleryController.getOneClubPhoto)
    .put(isLoggedIn, isOrganizers, GalleryController.updateClubPhoto)
    .delete(isLoggedIn, isCoordinator, GalleryController.deleteClubPhoto)

router.route("/coordinator")
    .get(isLoggedIn, isCoordinator, GalleryController.getCoordinatorGallery)

//Admin gallery Routers
router.route("/admins")
    .post(upload.array("images"), isLoggedIn, isAdmin, GalleryController.createAdminPhoto)

router.route("/admins/:_id")
    .get(GalleryController.getOneAdminPhoto)

//All gallery Router
router.route("/")
    .get(GalleryController.getAllPhotos)

router.route("/:_id")
    .get(GalleryController.getOnePhoto)
    .put(isLoggedIn, isAdmin, GalleryController.updatePhoto)
    .delete(isLoggedIn, isAdmin, GalleryController.deletePhoto)


module.exports = router