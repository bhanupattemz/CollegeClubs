const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const AdministrationModel = require("../Models/administrationModel")

module.exports.getAllAdministrators = WrapAsync(async (req, res) => {
    const administrators = await AdministrationModel.find({});
    const positionOrder = ["Principal", "Vice-Principal", "Faculty-Coordinator", "Student-Coordinator"];

    administrators.sort((a, b) => {
        return positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position);
    });

    res.status(200).json({
        success: true,
        data: administrators
    })
})

module.exports.getOneAdministrator = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const administrator = await AdministrationModel.findById(_id)
    if (!administrator) {
        throw new ExpressError("administrator not found", 404);

    }
    res.status(200).json({
        success: true,
        data: administrator
    })
})


module.exports.createAdministrator = WrapAsync(async (req, res, next) => {
    const administrator = req.body;
    const newAdministrator = AdministrationModel(administrator)
    await newAdministrator.save()
    const allAdministrators = await AdministrationModel.find()
    res.status(200).json({
        success: true,
        data: allAdministrators
    })
})

module.exports.updateAdministrator = WrapAsync(async (req, res, next) => {
    const updatedadministrator = req.body;
    const { _id } = req.params;
    const administrator = await AdministrationModel.findById(_id);
    if (!administrator) {
        throw new ExpressError("administrator not found", 404);
    }
    await AdministrationModel.findByIdAndUpdate(_id, updatedadministrator, { new: true, runValidators: true })
    const allAdministrators = await AdministrationModel.find()
    res.status(200).json({
        success: true,
        data: allAdministrators
    })
})

module.exports.deleteAdministrator = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const administrator = await AdministrationModel.findById(_id);
    if (!administrator) {
        throw new ExpressError("administrator not found", 404);
    }
    await AdministrationModel.findByIdAndDelete(_id)
    const allAdministrators = await AdministrationModel.find()
    res.status(200).json({
        success: true,
        data: allAdministrators
    })
})