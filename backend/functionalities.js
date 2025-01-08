const WrapAsync = require("./Utils/WrapAsync")
const ExpressError = require("./Utils/ExpressError")

const { cloudinary } = require("./config/cloudinary")

module.exports.deleteFromClodinary = WrapAsync(async (image) => {
    try {
        if (image && image.public_id !== "default") {
            await cloudinary.uploader.destroy(image.public_id);
        }
    } catch (err) {
        console.log(err)
    }
})