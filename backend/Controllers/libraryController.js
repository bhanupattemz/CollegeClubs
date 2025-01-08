const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const AcademicBooksModel = require("../Models/Library/academicModel")

module.exports.getAllAcademicBooks = WrapAsync(async (req, res) => {
    const data = req.query
    const academicBooks = await AcademicBooksModel.find({ ...data });
    if (academicBooks.length == 0) {
        throw new ExpressError("No Books Match Your Search", 404)
    }
    res.status(200).json({
        success: true,
        data: academicBooks
    })
})


module.exports.createAcademicBook = WrapAsync(async (req, res, next) => {
    const academicBook = req.body;
    const newacademicBook = AcademicBooksModel(academicBook)
    await newacademicBook.save()
    const allacademicBooks = await AcademicBooksModel.find()
    res.status(200).json({
        success: true,
        data: allacademicBooks
    })
})

module.exports.updateacAdemicBook = WrapAsync(async (req, res, next) => {
    const updatedacademicBook = req.body;
    const { _id } = req.params;
    const academicBook = await AcademicBooksModel.findById(_id);
    if (!academicBook) {
        throw new ExpressError("academicBook not found", 404);
    }
    await AcademicBooksModel.findByIdAndUpdate(_id, updatedacademicBook, { new: true, runValidators: true })
    const allacademicBooks = await AcademicBooksModel.find()
    res.status(200).json({
        success: true,
        data: allacademicBooks
    })
})

module.exports.deleteAcademicBook = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const academicBook = await AcademicBooksModel.findById(_id);
    if (!academicBook) {
        throw new ExpressError("academicBook not found", 404);
    }
    await AcademicBooksModel.findByIdAndDelete(_id)
    const allacademicBooks = await AcademicBooksModel.find()
    res.status(200).json({
        success: true,
        data: allacademicBooks
    })
})