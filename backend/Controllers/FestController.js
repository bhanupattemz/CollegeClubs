const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const EventModel = require("../Models/Fest/festEvents")
const MembersModel = require("../Models/Fest/members")
const ClubModel = require("../Models/Clubs/clubsModel")
const sendMail = require("../Utils/sendMail")
const { eventCertificate } = require("../Utils/certificates")
const { createPDF } = require("../Utils/CreateFile")
const FestModel = require("../Models/Fest/festModel")
const Razorpay = require("razorpay");
const crypto = require("crypto")
const { successFestEventRegistrationOptions } = require("../functionalities")
module.exports.getAllFests = WrapAsync(async (req, res) => {
    const fests = await FestModel.find({});
    res.status(200).json({
        success: true,
        data: fests
    })
})
module.exports.getOneFest = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const fest = await FestModel.findById(_id);
    if (!fest) {
        throw new ExpressError("Fest Not Found", 404)
    }
    res.status(200).json({
        success: true,
        data: fest
    })
})

module.exports.getCurrentFests = WrapAsync(async (req, res) => {
    const fests = await FestModel.find({ isactive: true });
    if (fests.length == 0) {
        throw new ExpressError("No Fest Declared Yet", 400)
    }
    res.status(200).json({
        success: true,
        data: fests[0]
    })
})


module.exports.createFest = WrapAsync(async (req, res, next) => {
    const fest = req.body;
    const newfest = FestModel(fest)
    await newfest.save()
    const allfests = await FestModel.find()
    res.status(200).json({
        success: true,
        data: allfests
    })
})

module.exports.updateFest = WrapAsync(async (req, res, next) => {
    const updatedfest = req.body;
    const { _id } = req.params;
    const fest = await FestModel.findById(_id);
    if (!fest) {
        throw new ExpressError("fest not found", 404);
    }
    const updatedFest = await FestModel.findByIdAndUpdate(_id, updatedfest, { new: true, runValidators: true })

    res.status(200).json({
        success: true,
        data: updatedFest
    })
})

module.exports.deleteFest = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const fest = await FestModel.findById(_id);
    if (!fest) {
        throw new ExpressError("fest not found", 404);
    }
    await FestModel.findByIdAndDelete(_id)
    const allfests = await FestModel.find()
    res.status(200).json({
        success: true,
        data: allfests
    })
})










// events 
const mongoose = require("mongoose");

module.exports.getAllEvents = WrapAsync(async (req, res) => {
    const { key } = req.query;
    const fest = await FestModel.findOne({ isactive: true });
    if (!fest || !fest.events || fest.events.length === 0) {
        throw new ExpressError("No Fest Is Open Yet or No Events Found.", 400);
    }
    const isValidObjectId = key && mongoose.Types.ObjectId.isValid(key);
    const filteredEvents = await EventModel.find({
        _id: { $in: fest.events },
        $or: [
            { name: { $regex: new RegExp(key, "i") } },
            ...(isValidObjectId ? [{ _id: key }] : []),
        ],
    });
    res.status(200).json({
        success: true,
        data: filteredEvents,
    });
});

module.exports.getOneEvent = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const event = await EventModel.findById(_id)
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    res.status(200).json({
        success: true,
        data: event
    })
})


module.exports.createEvent = WrapAsync(async (req, res, next) => {
    const event = req.body;
    const { _id } = req.params
    const fest = await FestModel.findOne({ _id });
    if (!fest) {
        throw new ExpressError("Fest Not Found", 404);
    }
    const newEvent = new EventModel({ ...event });
    fest.events.push(newEvent);
    await newEvent.save();
    await fest.save();
    res.status(200).json({
        success: true,
        data: newEvent
    });
});


module.exports.updateEvent = WrapAsync(async (req, res, next) => {
    const updatedEvent = req.body;
    const { _id } = req.params;
    const event = await EventModel.findById(_id);
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    if (event.createdBy !== req.user._id && req.user.role !== "admin") {
        throw new ExpressError("You are not allowed to delete this Event.", 403)
    }
    await EventModel.findByIdAndUpdate(_id, { ...updatedEvent }, { new: true, runValidators: true })
    const allEvents = await EventModel.find()
    res.status(200).json({
        success: true,
        data: allEvents
    })
})

module.exports.deleteEvent = WrapAsync(async (req, res) => {
    const { _id } = req.params;
    const event = await EventModel.findById(_id);
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    if (event.createdBy !== req.user._id && req.user.role !== "admin") {
        throw new ExpressError("You are not allowed to delete this Event.", 403)
    }
    await EventModel.findOneAndDelete({ _id })
    const allEvents = await EventModel.find()
    res.status(200).json({
        success: true,
        data: allEvents
    })
})




module.exports.updateEventClubs = WrapAsync(async (req, res) => {
    const { _id } = req.params;
    const { deleteClubs, addClubs } = req.body;
    const verifiedClubs = [];
    let event = await EventModel.findById(_id)
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    if (req.user.role !== "admin") {
        throw new ExpressError("You are not allowed to delete this Event.", 403)
    }
    if (await event.timings.starting < Date.now()) {
        throw new ExpressError("unable to update.", 400)
    }
    for (let addclub of addClubs) {
        if (!event.conductedClub.includes(addclub)) {
            const club = await ClubModel.findById(addclub);
            if (club) {
                verifiedClubs.push(addclub);
            }
        }
    }
    event = await EventModel.findByIdAndUpdate(
        _id,
        {
            $pull: { conductedClub: { $in: deleteClubs } }
        },
        { new: true }
    );
    event = await EventModel.findByIdAndUpdate(
        _id,
        {
            $push: { conductedClub: { $each: verifiedClubs } }
        },
        { new: true }
    );

    res.status(200).json({
        success: true
    });
});


module.exports.createRegisterEventOrder = WrapAsync(async (req, res, next) => {
    const { _id } = req.params
    const fest = await FestModel.find({ isactive: true, events: { $in: [_id] } })
    if (!fest || fest.length == 0) {
        throw new ExpressError("Event fest is not active now.", 400)
    }
    const event = await EventModel.findById(_id)
    const currentTime = Date.now()
    if (!(new Date(event.registration.starting).getTime() < currentTime && new Date(event.registration.ending).getTime() > currentTime)) {
        throw new ExpressError("Event not in registration period", 400)
    }
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    const options = {
        amount: event.amount * 100,
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
        payment_capture: 1
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json({
        success: true,
        data: order
    })
})

module.exports.registerMember = WrapAsync(async (req, res) => {
    const { data, member } = req.body
    const { _id } = req.params
    const fest = await FestModel.find({ isactive: true, events: { $in: [_id] } })
    if (!fest || fest.length == 0) {
        throw new ExpressError("Event fest is not active now.", 400)
    }
    const event = await EventModel.findById(_id)
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
    const newMember = MembersModel({ ...member, paymentInfo });
    await newMember.save()
    const updatedEvent = await EventModel.findByIdAndUpdate(_id, { $push: { members: newMember } })
    const options = await successFestEventRegistrationOptions(event, fest[0], user = newMember)
    let mailData = await sendMail(options);
    if (!mailData) {
        console.error(`Error sending email to ${member.name}:`, mailData);
    }
    res.status(200).json({
        success: true,
        event: updatedEvent
    })
})


module.exports.eventWinner = WrapAsync(async (req, res) => {
    let data = req.body;
    const { _id } = req.params;
    let signImages = [
        "https://res.cloudinary.com/delc5g3p5/image/upload/v1729765796/Clubs/izahxydbhnphbak4jbns.png",
        "https://res.cloudinary.com/delc5g3p5/image/upload/v1729765796/Clubs/izahxydbhnphbak4jbns.png",
        "https://res.cloudinary.com/delc5g3p5/image/upload/v1729765796/Clubs/izahxydbhnphbak4jbns.png"
    ];

    let event = await EventModel.findById(_id);
    if (event.timings.ending > Date.now()) {
        throw new ExpressError("Event not yet Completed", 400)
    }
    if (!event) {
        throw new ExpressError("Event not found", 404);
    }
    const winners = [];
    const htmlContent = [];

    for (let userId of data) {
        const user = await MembersModel.findById(userId);
        if (!user) {
            throw new ExpressError("User not found", 404);
        }
        if (!event.members.includes(userId)) {
            throw new ExpressError(`User is not participating in the event`, 400);
        }

        winners.push(user);
        htmlContent.push(eventCertificate(winners[winners.length - 1], event.name, winners.length, signImages, user.year, event.timings.starting));
    }


    event = await EventModel.findByIdAndUpdate(_id, { winner: winners }, { new: true, runValidators: true });


    for (let i = 0; i < winners.length; i++) {
        const winner = winners[i];
        const htmldata = htmlContent[i];
        const pdfBuffer = await createPDF(htmldata);

        const options = {
            mail: winner.mail,
            subject: `Winner of ${event.name}`,
            text: `Congratulations! You are the winner of ${event.name}. Your certificate is attached.`,
            message: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; border-radius: 8px; color: #333;">
                    <h2 style="font-size: 18px; color: #2c3e50; margin-bottom: 20px;">
                        🎉 Congratulations on Winning <strong>${event.name}</strong>!
                    </h2>
                    <p style="font-size: 16px; color: #444444; line-height: 1.6;">
                        We are thrilled to announce that you have emerged victorious in <strong>${event.name}</strong>! Your hard work and dedication have truly paid off.
                    </p>
                    <p style="font-size: 16px; color: #444444; line-height: 1.6;">
                        As a token of your achievement, your official certificate has been attached to this email. Please feel free to download and share it with others to celebrate your success.
                    </p>
                    <p style="font-size: 14px; color: #777777; margin-top: 20px; line-height: 1.6;">
                        Once again, congratulations from the entire team! Keep up the amazing work, and we look forward to your continued participation in future events.
                    </p>
                    <p style="font-size: 14px; color: #777777; line-height: 1.6;">
                        Best regards,<br>
                        The Event Organizing Team
                    </p>
                </div>
            `,
            attachments: [
                {
                    filename: `${winner.name}-certificate.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                },
            ],
        };
        const mailData = await sendMail(options);

        if (!mailData) {
            console.error(`Error sending email to ${winner.name}:`, mailData);
        }
    }

    res.status(200).json({
        success: true,
        message: `Winner declared for the event ${event.name}`,
        event: event
    });
});


