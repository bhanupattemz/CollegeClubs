const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const AcademicBooksModel = require("../Models/Library/academicModel")
const { deleteFromClodinary } = require("../functionalities")
module.exports.getAllAcademicBooks = WrapAsync(async (req, res) => {
    let data = req.query
    const key = data.key
    data = { ...data, key: undefined }
    const academicBooks = await AcademicBooksModel.find({
        ...data,
        $or: [
            { title: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
            { subject: { $regex: new RegExp(key, "i") } },
            { type: { $regex: new RegExp(key, "i") } }
        ]
    });
    if (academicBooks.length == 0) {
        throw new ExpressError("No Books Match Your Search", 404)
    }
    res.status(200).json({
        success: true,
        data: academicBooks
    })
})
module.exports.getbookDetails = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const academicBook = await AcademicBooksModel.findById(_id)
    if (!academicBook) {
        throw new ExpressError("Book Not Found", 404)
    }
    res.status(200).json({
        success: true,
        data: academicBook
    })
})

module.exports.createAcademicBook = WrapAsync(async (req, res, next) => {
    const bodyData = req.body;
    let pdf;
    if (req.file) {
        pdf = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    } else {
        throw new ExpressError("pdf is required", 400)
    }
    let academicBook = {
        degree: bodyData.degree,
        branch: bodyData.branch,
        year: bodyData.year,
        sem: bodyData.sem,
        type: bodyData.type,
        subject: bodyData.subject,
        title: bodyData.title,
        pdf: pdf
    }
    const newacademicBook = AcademicBooksModel(academicBook)
    await newacademicBook.save()
    const allacademicBooks = await AcademicBooksModel.find()
    res.status(200).json({
        success: true,
        data: allacademicBooks
    })
})

module.exports.updateacAdemicBook = WrapAsync(async (req, res, next) => {
    const bodyData = req.body;
    const { _id } = req.params;
    const academicBook = await AcademicBooksModel.findById(_id);
    if (!academicBook) {
        throw new ExpressError("academicBook not found", 404);
    }
    let pdf;
    if (req.file) {
        deleteFromClodinary(academicBook.pdf)
        pdf = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    } else {
        pdf = academicBook.pdf
    }
    let updatedacademicBook = {
        degree: bodyData.degree,
        branch: bodyData.branch,
        year: bodyData.year,
        sem: bodyData.sem,
        type: bodyData.type,
        subject: bodyData.subject,
        title: bodyData.title,
        pdf: pdf
    }
    await AcademicBooksModel.findByIdAndUpdate(_id, updatedacademicBook, { new: true, runValidators: true })
    res.status(200).json({
        success: true
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