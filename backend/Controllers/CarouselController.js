const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const CarouselModel = require("../Models/carouselModel")
const { deleteFromClodinary } = require("../functionalities")
module.exports.getAllCarousels = WrapAsync(async (req, res) => {
    const { key } = req.query
    const carousels = await CarouselModel.find({
        $or: [
            { heading: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
        ]
    });
    res.status(200).json({
        success: true,
        data: carousels
    })
})

module.exports.carouselDetails = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const carousel = await CarouselModel.findById(_id);
    if (!carousel) {
        throw new ExpressError("Carousel Not found!", 404)
    }
    res.status(200).json({
        success: true,
        data: carousel
    })
})



module.exports.createCarousel = WrapAsync(async (req, res, next) => {
    const carousel = req.body;
    let image;
    if (req.file) {
        image = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    }
    const newcarousel = CarouselModel({ ...carousel, image: { ...image } })
    await newcarousel.save()
    res.status(200).json({
        success: true
    })
})


module.exports.updateCarousel = WrapAsync(async (req, res, next) => {
    const updatedcarousel = req.body;
    const { _id } = req.params;
    const carousel = await CarouselModel.findById(_id);
    if (!carousel) {
        throw new ExpressError("carousel not found", 404);
    }
    let image;
    if (req.file) {
        deleteFromClodinary(carousel.image)
        image = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    } else {
        image = carousel.image
    }
    await CarouselModel.findByIdAndUpdate(_id, { ...updatedcarousel, image: image }, { new: true, runValidators: true })
    const allcarousels = await CarouselModel.find()
    res.status(200).json({
        success: true,
        data: allcarousels
    })
})

module.exports.deleteCarousel = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const carousel = await CarouselModel.findById(_id);
    if (!carousel) {
        throw new ExpressError("carousel not found", 404);
    }
    await CarouselModel.findByIdAndDelete(_id)
    const allcarousels = await CarouselModel.find()
    res.status(200).json({
        success: true,
        data: allcarousels
    })
})