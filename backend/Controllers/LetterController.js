const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const LetterModel = require("../Models/lettersModel")
const { deleteFromClodinary } = require("../functionalities")
module.exports.getAllLetters = WrapAsync(async (req, res) => {
    const { key } = req.query
    const letters = await LetterModel.find({
        $or: [
            { title: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
            { content: { $regex: new RegExp(key, "i") } },
            { visibility: { $regex: new RegExp(key, "i") } }
        ]
    }).sort({ date: -1 });
    res.status(200).json({
        success: true,
        data: letters
    })
})

module.exports.getOneLetter = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const letter = await LetterModel.findById(_id)
    if (!letter) {
        throw new ExpressError("letter not found", 404);
    }
    res.status(200).json({
        success: true,
        data: letter
    })
})


module.exports.createLetter = WrapAsync(async (req, res, next) => {
    const bodydata = req.body;
    let pdf;
    if (req.file) {
        pdf = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    }
    let letter = {
        title: bodydata.title,
        content: bodydata.content,
        pdf: pdf,
        visibility: bodydata.visibility
    }
    const newletter = new LetterModel(letter)
    await newletter.save()
    const allletters = await LetterModel.find().sort({ date: -1 })
    res.status(200).json({
        success: true,
        data: allletters
    })
})

module.exports.updateLetter = WrapAsync(async (req, res, next) => {
    const bodydata = req.body;
    const { _id } = req.params;
    const letter = await LetterModel.findById(_id);
    if (!letter) {
        throw new ExpressError("letter not found", 404);
    }
    let pdf;
    if (req.file) {
        deleteFromClodinary(letter.pdf)
        pdf = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    } else {
        pdf = letter.pdf
    }
    let updatedletter = {
        title: bodydata.title,
        content: bodydata.content,
        pdf: pdf,
        visibility: bodydata.visibility
    }
    await LetterModel.findByIdAndUpdate(_id, { ...updatedletter, updatedAt: Date.now() }, { new: true, runValidators: true })
    const allletters = await LetterModel.find().sort({ date: -1 })
    res.status(200).json({
        success: true,
        data: allletters
    })
})

module.exports.deleteLetter = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const letter = await LetterModel.findById(_id);

    if (!letter) {
        throw new ExpressError("letter not found", 404);
    }
    await LetterModel.findByIdAndDelete(_id)
    const allletters = await LetterModel.find().sort({ date: -1 })
    res.status(200).json({
        success: true,
        data: allletters
    })
})