const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const AdministrationModel = require("../Models/administrationModel")
const functionalities = require("../functionalities")
module.exports.getAllAdministrators = WrapAsync(async (req, res) => {
    const { key } = req.query
    const administrators = await AdministrationModel.find({
        $or: [
            { name: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
            { position: { $regex: new RegExp(key, "i") } }
        ]
    });
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
    const bodyData = req.body;
    let image, signature;
    if (req.files?.["image"]) {
        image = {
            public_id: req.files["image"][0].filename,
            url: req.files["image"][0].path,
        };
    }
    if (req.files?.["signature"]) {
        signature = {
            public_id: req.files["signature"][0].filename,
            url: req.files["signature"][0].path,
        };
    }
    if (!image) {
        if (signature) await functionalities.deleteFromClodinary(signature);
        throw new ExpressError("image is required.", 400);
    }
    if (!signature) {
        if (image) await functionalities.deleteFromClodinary(image);
        throw new ExpressError("signature is required.", 400);
    }
    let administrator = {
        name: bodyData.name,
        description: bodyData.description,
        image: image,
        signature: signature,
        mobileNo: bodyData.mobileNo,
        mail: bodyData.mail,
        position: bodyData.position,
        isactive: bodyData.isactive ? JSON.parse(bodyData.isactive) : true
    }
    const newAdministrator = AdministrationModel(administrator)
    await newAdministrator.save()
    const allAdministrators = await AdministrationModel.find()
    res.status(200).json({
        success: true,
        data: allAdministrators
    })
})

module.exports.updateAdministrator = WrapAsync(async (req, res, next) => {
    const bodyData = req.body;
    const { _id } = req.params;
    const administrator = await AdministrationModel.findById(_id);
    if (!administrator) {
        throw new ExpressError("administrator not found", 404);
    }
    let image, signature;
    if (req.files?.["image"]) {
        functionalities.deleteFromClodinary(administrator.image)
        image = {
            public_id: req.files["image"][0].filename,
            url: req.files["image"][0].path,
        };
    } else {
        image = administrator.image
    }
    if (req.files?.["signature"]) {
        functionalities.deleteFromClodinary(administrator.signature)
        signature = {
            public_id: req.files["signature"][0].filename,
            url: req.files["signature"][0].path,
        };
    } else {
        signature = administrator.signature
    }
    let updatedadministrator = {
        name: bodyData.name,
        description: bodyData.description,
        image: image,
        signature: signature,
        mobileNo: bodyData.mobileNo,
        mail: bodyData.mail,
        position: bodyData.position,
        isactive: bodyData.isactive ? JSON.parse(bodyData.isactive) : true
    }
    await AdministrationModel.findByIdAndUpdate(_id, updatedadministrator, { new: true, runValidators: true })
    res.status(200).json({
        success: true
    })
})

module.exports.deleteAdministrator = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const administrator = await AdministrationModel.findById(_id);
    if (!administrator) {
        throw new ExpressError("administrator not found", 404);
    }
    const members = await AdministrationModel.find({ position: administrator.position })
    if (members.length < 2) {
        throw new ExpressError("Each position, atleast one member", 400)
    }
    functionalities.deleteFromClodinary(administrator.image)
    functionalities.deleteFromClodinary(administrator.signature)
    await AdministrationModel.findByIdAndDelete(_id)
    const allAdministrators = await AdministrationModel.find()
    res.status(200).json({
        success: true,
        data: allAdministrators
    })
})