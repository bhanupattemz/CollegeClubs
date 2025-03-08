const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const certificatesModel = require("../Models/certificatesModel")

module.exports.getUserCertificates = WrapAsync(async (req, res) => {
    const { _id } = req.params;
    if (req.user._id != _id || req.user.role != "admin") {
        throw new ExpressError("You do not have permission to access this resource.", 403)
    }
    const Certificates = await certificatesModel.find({ user: _id }).sort({ createdAt: -1 }).populate({path:"event",select:"name"})
    res.status(200).json({
        success: true,
        data: Certificates
    })
})

module.exports.getAllCertificates = WrapAsync(async (req, res) => {
    const certificates = await certificatesModel.find();
    if (certificates.length == 0) {
        throw new ExpressError("No certificates found", 404)
    }
    res.status(200).json({
        success: true,
        data: certificates
    })
})


module.exports.createCertificate = WrapAsync(async (req, res, next) => {
    const certificate = req.body;
    const newcertificate = certificatesModel(certificate)
    await newcertificate.save()
    const allcertificates = await certificatesModel.find()
    res.status(200).json({
        success: true,
        data: allcertificates
    })
})

module.exports.updateCertificate = WrapAsync(async (req, res, next) => {
    const updatedcertificate = req.body;
    const { _id } = req.params;
    const certificate = await certificatesModel.findById(_id);
    if (!certificate) {
        throw new ExpressError("certificate not found", 404);
    }
    await certificatesModel.findByIdAndUpdate(_id, updatedcertificate, { new: true, runValidators: true })
    const allcertificates = await certificatesModel.find()
    res.status(200).json({
        success: true,
        data: allcertificates
    })
})

module.exports.deleteCertificate = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const certificate = await certificatesModel.findById(_id);
    if (!certificate) {
        throw new ExpressError("certificate not found", 404);
    }
    await certificatesModel.findByIdAndDelete(_id)
    const allcertificates = await certificatesModel.find()
    res.status(200).json({
        success: true,
        data: allcertificates
    })
})

