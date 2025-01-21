const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const LetterModel = require("../Models/lettersModel")

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
    const letter = req.body;
    const newletter = new LetterModel({ ...letter, createdBy: req.user._id })
    await newletter.save()
    const allletters = await LetterModel.find().sort({ date: -1 })
    res.status(200).json({
        success: true,
        data: allletters
    })
})

module.exports.updateLetter = WrapAsync(async (req, res, next) => {
    const updatedletter = req.body;
    const { _id } = req.params;
    const letter = await LetterModel.findById(_id);
    if (!letter) {
        throw new ExpressError("letter not found", 404);
    }
    await LetterModel.findByIdAndUpdate(_id, { ...updatedletter, updatedAt: Date.now(), createdBy: req.user._id }, { new: true, runValidators: true })
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