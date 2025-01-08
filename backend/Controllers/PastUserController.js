const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const PastUserModel = require("../Models/PastMembers/pastUser")


module.exports.getAllPastUsers = WrapAsync(async (req, res) => {
    const pastUsers = await PastUserModel.find({});
    res.status(200).json({
        success: true,
        data: pastUsers
    })
})

module.exports.getOnePastUser = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const pastUser = await PastUserModel.findById(_id)
    if (!pastUser) {
        throw new ExpressError("Past User not found", 404);
    }
    res.status(200).json({
        success: true,
        data: pastUser
    })
})


module.exports.createPastUser = WrapAsync(async (req, res, next) => {
    const pastUser = req.body;
    const newpastUser = PastUserModel(pastUser)
    await newpastUser.save()
    const allpastUsers = await PastUserModel.find()
    res.status(200).json({
        success: true,
        data: allpastUsers
    })
})

module.exports.updatePastUser = WrapAsync(async (req, res, next) => {
    const updatedpastUser = req.body;
    const { _id } = req.params;
    const pastUser = await PastUserModel.findById(_id);
    if (!pastUser) {
        throw new ExpressError("Past User not found", 404);
    }
    await PastUserModel.findByIdAndUpdate(_id, updatedpastUser, { new: true, runValidators: true })
    const allpastUsers = await PastUserModel.find()
    res.status(200).json({
        success: true,
        data: allpastUsers
    })
})

module.exports.deletePastUser = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const pastUser = await PastUserModel.findById(_id);
    if (!pastUser) {
        throw new ExpressError("donar not found", 404);
    }
    await PastUserModel.findByIdAndDelete(_id)
    const alldonars = await PastUserModel.find()
    res.status(200).json({
        success: true,
        data: alldonars
    })
})