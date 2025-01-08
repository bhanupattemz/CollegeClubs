const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const ContactModel = require("../Models/contactModel")

module.exports.getAllContactMsgs = WrapAsync(async (req, res) => {
    const ContactMsgs = await ContactModel.find({});
    res.status(200).json({
        success: true,
        data: ContactMsgs
    })
})


module.exports.createContactMsg = WrapAsync(async (req, res, next) => {
    const ContactMsg = req.body;
    const newContactMsg = ContactModel(ContactMsg)
    await newContactMsg.save()
    res.status(200).json({
        success: true,
    })
})



module.exports.deleteContactMsg = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const ContactMsg = await ContactModel.findById(_id);
    if (!ContactMsg) {
        throw new ExpressError("ContactMsg not found", 404);
    }
    await ContactModel.findByIdAndDelete(_id)
    const allContactMsgs = await ContactModel.find()
    res.status(200).json({
        success: true,
        data: allContactMsgs
    })
})