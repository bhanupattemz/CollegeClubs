const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const DonationModel = require("../Models/donationModel")
const Razorpay = require("razorpay");
const crypto = require("crypto")
module.exports.getAllDonars = WrapAsync(async (req, res) => {
    const { key } = req.query
    const donars = await DonationModel.find({
        $or: [
            { name: { $regex: new RegExp(key, "i") } },
            { mail: { $regex: new RegExp(key, "i") } },
            { phone: { $regex: new RegExp(key, "i") } }
        ]
    }).populate({ path: "club", select: "name" }).sort({ "createdAt": -1 });
    res.status(200).json({
        success: true,
        data: donars
    })
})
module.exports.getTopDonars = WrapAsync(async (req, res) => {
    const donars = await DonationModel.find({}).select("name amount createdAt club").populate({ path: "club", select: "name" }).sort({ "createdAt": -1 }).limit(10);
    res.status(200).json({
        success: true,
        data: donars
    })
})

module.exports.getOneDonar = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const donar = await DonationModel.findById(_id)
    if (!donar) {
        throw new ExpressError("donar not found", 404);

    }
    res.status(200).json({
        success: true,
        data: donar
    })
})

module.exports.createDonationOrder = WrapAsync(async (req, res, next) => {
    const { amount, currency = "INR", receipt } = req.body;
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
        amount: amount * 100,
        currency,
        receipt,
        payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({
        success: true,
        data: order
    })
})
module.exports.createDonar = WrapAsync(async (req, res, next) => {
    const { data, donar } = req.body
    const paymentInfo = {
        paymentId: data.razorpay_payment_id,
        status: true
    }
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    sha.update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
    const digest = sha.digest('hex')
    if (digest !== data.razorpay_signature) {
        throw new ExpressError("Invalid payment signature", 400)
    }
    const newdonar = DonationModel({ ...donar, paymentInfo })
    await newdonar.save()
    res.status(200).json({
        success: true
    })
})

module.exports.updateDonar = WrapAsync(async (req, res, next) => {
    const updateddonar = req.body;
    const { _id } = req.params;
    const donar = await DonationModel.findById(_id);
    if (!donar) {
        throw new ExpressError("donar not found", 404);
    }
    await DonationModel.findByIdAndUpdate(_id, updateddonar, { new: true, runValidators: true })
    const alldonars = await DonationModel.find()
    res.status(200).json({
        success: true,
        data: alldonars
    })
})

module.exports.deleteDonar = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const donar = await DonationModel.findById(_id);
    if (!donar) {
        throw new ExpressError("donar not found", 404);
    }
    await DonationModel.findByIdAndDelete(_id)
    const alldonars = await DonationModel.find()
    res.status(200).json({
        success: true,
        data: alldonars
    })
})