const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const CarouselModel = require("../Models/carouselModel")

module.exports.getAllCarousels = WrapAsync(async (req, res) => {
    const carousels = await CarouselModel.find({});
    res.status(200).json({
        success: true,
        data: carousels
    })
})


module.exports.createCarousel = WrapAsync(async (req, res, next) => {
    const carousel = req.body;
    const newcarousel = CarouselModel(carousel)
    await newcarousel.save()
    const allcarousels = await CarouselModel.find()
    res.status(200).json({
        success: true,
        data: allcarousels
    })
})

module.exports.updateCarousel = WrapAsync(async (req, res, next) => {
    const updatedcarousel = req.body;
    const { _id } = req.params;
    const carousel = await CarouselModel.findById(_id);
    if (!carousel) {
        throw new ExpressError("carousel not found", 404);
    }
    await CarouselModel.findByIdAndUpdate(_id, updatedcarousel, { new: true, runValidators: true })
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