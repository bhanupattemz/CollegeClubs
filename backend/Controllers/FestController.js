const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const EventModel = require("../Models/Fest/festEvents")
const MembersModel = require("../Models/Fest/members")
const ClubModel = require("../Models/Clubs/clubsModel")
const AdministrationModel = require("../Models/administrationModel")
const sendMail = require("../Utils/sendMail")
const { eventCertificate } = require("../Utils/certificates")
const { createPDF } = require("../Utils/CreateFile")
const FestModel = require("../Models/Fest/festModel")
const Razorpay = require("razorpay");
const crypto = require("crypto")
const { successFestEventRegistrationOptions } = require("../functionalities")
const { deleteFromClodinary } = require('../functionalities')
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
module.exports.getAllFests = WrapAsync(async (req, res) => {
    let { key } = req.query
    const fests = await FestModel.find({
        $or: [
            { name: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
        ]
    }).sort({ createdAt: -1 });
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
    const bodyData = req.body;
    let fest = {
        name: bodyData.name,
        description: bodyData.description,
        isactive: bodyData.isActive,
        image: {
            public_id: "default",
            url: "https://res.cloudinary.com/delc5g3p5/image/upload/v1736265076/s15xnqniqrijpszt4c6k.png"
        }
    }
    if (req.file) {
        fest.image = {
            public_id: req.file.filename,
            url: req.file.path,
        }
    }
    if (fest.isactive) {
        await FestModel.updateMany({ isactive: false })
    }
    const newfest = FestModel(fest)
    await newfest.save()
    res.status(200).json({
        success: true
    })
})

module.exports.updateFest = WrapAsync(async (req, res, next) => {
    const bodyData = req.body;
    const { _id } = req.params;
    const fest = await FestModel.findById(_id);
    if (!fest) {
        throw new ExpressError("fest not found", 404);
    }
    let festData = {
        name: bodyData.name,
        description: bodyData.description,
        isactive: bodyData.isActive,
        image: fest.image
    }
    if (req.file) {
        fest.image = {
            public_id: req.file.filename,
            url: req.file.path,
        }
        deleteFromClodinary(fest.image)
    }
    if (festData.isactive) {
        await FestModel.updateMany({ isactive: false })
    }
    const updatedFest = await FestModel.findByIdAndUpdate(_id, festData, { new: true, runValidators: true })

    res.status(200).json({
        success: true
    })
})

module.exports.deleteFest = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const fest = await FestModel.findById(_id);
    if (!fest) {
        throw new ExpressError("fest not found", 404);
    }
    deleteFromClodinary(fest.image)
    await FestModel.findByIdAndDelete(_id)
    const allfests = await FestModel.find().sort({ createdAt: -1 })
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

module.exports.AdminGetAllEvents = WrapAsync(async (req, res) => {
    const { key } = req.query;
    const isValidObjectId = key && mongoose.Types.ObjectId.isValid(key);
    const filteredEvents = await EventModel.find({
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
    const event = await EventModel.findById(_id).populate({ path: "conductedClub", select: "name" })
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    res.status(200).json({
        success: true,
        data: event
    })
})

module.exports.adminGetOneEvent = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const event = await EventModel.findById(_id).populate({ path: "conductedClub", select: "name" }).populate("members")
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    res.status(200).json({
        success: true,
        data: event
    })
})

module.exports.createEvent = WrapAsync(async (req, res, next) => {
    const bodyData = req.body;
    const { _id } = req.params
    const fest = await FestModel.findOne({ _id });
    if (!fest) {
        throw new ExpressError("Fest Not Found", 404);
    }
    let image, pdf;
    if (req.files?.["pdf"]) {
        pdf = {
            public_id: req.files["pdf"][0].filename,
            url: req.files["pdf"][0].path,
        };
    }
    if (req.files?.["image"]) {
        image = {
            public_id: req.files["image"][0].filename,
            url: req.files["image"][0].path,
        };
    } else {
        image = {
            public_id: "public",
            url: "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg"
        }
    }
    if (!pdf) {
        deleteFromClodinary(image)
        throw new ExpressError("Instructions PDF is required", 400)
    }

    let event = {
        name: bodyData.name,
        venue: {
            landMark: bodyData.landMark,
            venueName: bodyData.venueName
        },
        amount: bodyData.amount,
        subheading: bodyData.subheading,
        description: bodyData.description,
        timings: JSON.parse(bodyData.timings),
        registration: JSON.parse(bodyData.registration),
        conductedClub: bodyData.conductedClub && JSON.parse(bodyData.conductedClub),
        image: image,
        pdf: pdf,
        prizes: JSON.parse(bodyData.prizes)
    };
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
    const bodyData = req.body;
    const { _id } = req.params;
    const event = await EventModel.findById(_id);
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    if (bodyData.fest) {
        const fest = await FestModel.findById(bodyData.fest)
        if (!fest) {
            throw new ExpressError("Fest Not Found", 404);
        }
    }
    let image, pdf;
    if (req.files?.["pdf"]) {
        deleteFromClodinary(event.pdf)
        pdf = {
            public_id: req.files["pdf"][0].filename,
            url: req.files["pdf"][0].path,
        };
    } else {
        pdf = event.pdf
    }
    if (req.files?.["image"]) {
        deleteFromClodinary(event.image)
        image = {
            public_id: req.files["image"][0].filename,
            url: req.files["image"][0].path,
        };
    } else {
        image = event.image
    }
    let updatedEvent = {
        name: bodyData.name,
        venue: {
            landMark: bodyData.landMark,
            venueName: bodyData.venueName
        },
        amount: bodyData.amount,
        subheading: bodyData.subheading,
        description: bodyData.description,
        timings: JSON.parse(bodyData.timings),
        registration: JSON.parse(bodyData.registration),
        conductedClub: bodyData.conductedClub && JSON.parse(bodyData.conductedClub),
        image: image,
        pdf: pdf,
        prizes: JSON.parse(bodyData.prizes)
    };
    await EventModel.findByIdAndUpdate(_id, { ...updatedEvent }, { new: true, runValidators: true })
    if (bodyData.fest) {
        await FestModel.findOneAndUpdate({ events: _id }, { $pull: { events: _id } });
        await FestModel.findByIdAndUpdate(bodyData.fest, { $push: { events: _id } });
    }
    res.status(200).json({
        success: true
    })
})

module.exports.deleteEvent = WrapAsync(async (req, res) => {
    const { _id } = req.params;
    const event = await EventModel.findById(_id);
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    await EventModel.findOneAndDelete({ _id })
    const fest = await FestModel.findOneAndUpdate(
        { events: event._id },
        { $pull: { events: event._id } },
        { new: true }
    ).populate("events");
    res.status(200).json({
        success: true,
        data: fest.events
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
    const { mail } = req.body
    const fest = await FestModel.find({ events: { $in: [_id] } })
    if (!fest || fest.length == 0) {
        throw new ExpressError("Event fest is not active now.", 400)
    }
    if (!mail) {
        throw new ExpressError("mail is required", 400)
    }
    const member = await MembersModel.find({ mail: mail })
    if (member && member.length != 0) {
        throw new ExpressError("Mail is already used", 400)
    }
    const event = await EventModel.findById(_id)
    const currentTime = Date.now()
    if (!(new Date(event.registration.starting).getTime() < currentTime && new Date(event.registration.ending).getTime() > currentTime)) {
        throw new ExpressError("Event not in registration period", 400)
    }
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
        status: true,
        amount: event.amount
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




module.exports.unregisterMember = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const { member } = req.body
    const student = await MembersModel.findById(member)
    if (!student) {
        throw new ExpressError("member is not found", 400)
    }
    if (!student.paymentInfo || !student.paymentInfo.paymentId) {
        throw new ExpressError("Payment details not found for this member.", 400);
    }
    const event = await EventModel.findById(_id).populate("conductedClub");
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    if (!event.members.includes(member)) {
        throw new ExpressError("Not A Member in events", 400);
    }
    const userClubs = await ClubModel.find({ coordinators: { details: req.user._id } })
    const isCoordinator = userClubs.some(club => club._id.toString() === event.conductedClub.toString());
    if (!isCoordinator && req.user.role !== "admin") {
        throw new ExpressError("You are not allowed to edit this Event.", 403)
    }
    const refund = await razorpay.payments.refund(student.paymentInfo.paymentId, {
        amount: student.paymentInfo.amount * 100,
        speed: "optimum"
    });
    student.paymentInfo.status = "refunded";
    await student.save()
    await EventModel.findByIdAndUpdate(_id, { $pull: { members: member } }, { new: true })
    const UpdatedClub = await EventModel.findById(_id).populate({ path: "members" })
    res.status(200).json({
        success: true,
        data: UpdatedClub.members,
        refundDetails: refund
    })
})


module.exports.eventWinner = WrapAsync(async (req, res) => {
    let data = req.body;
    const { _id } = req.params;
    const positions = ["Principal", "Faculty-Coordinator", "Student-Coordinator"]
    let signImages = []
    for (let item of positions) {
        const administrator = await AdministrationModel.findOne({ position: item })
        if (administrator.signature) signImages.push(administrator.signature)
    }
    if (signImages.length != 3) {
        throw new ExpressError("Signature Error", 400)
    }

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
        const user = await MembersModel.findById(userId._id);
        if (!user) {
            throw new ExpressError("Member not found", 404);
        }
        if (!event.members.includes(user._id)) {
            throw new ExpressError(`Member is not participating in the event`, 400);
        }
        winners.push(user);
        htmlContent.push(eventCertificate(winners[winners.length - 1], event.name, winners.length, signImages, user.academicYear, event.timings.starting));
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




// Members 


module.exports.festmembers = WrapAsync(async (req, res) => {
    let { key } = req.query
    const members = await MembersModel.find({
        $or: [
            { name: { $regex: new RegExp(key, "i") } },
            { college: { $regex: new RegExp(key, "i") } },
            { mail: { $regex: new RegExp(key, "i") } },
        ]
    }).sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        data: members,
    })
})

module.exports.festmemberDetails = WrapAsync(async (req, res) => {
    let { _id } = req.params
    const member = await MembersModel.findById(_id)
    res.status(200).json({
        success: true,
        data: member,
    })
})

module.exports.festmemberUpdate = WrapAsync(async (req, res) => {
    let { _id } = req.params
    const bodyData = req.body
    const member = await MembersModel.findById(_id)
    if (!member) {
        throw new ExpressError("Member Not Found", 400)
    }
    await MembersModel.findByIdAndUpdate(_id, bodyData, { new: true, runValidators: true })
    res.status(200).json({
        success: true,
    })
})

module.exports.deleteFestMember = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const events = await EventModel.find({ members: _id });
    for (const event of events) {
        event.members.pull(_id);
        await event.save();
    }
    const member = await MembersModel.findOneAndDelete(_id)
    if (!member) {
        throw new ExpressError("Member Not Found", 400)
    }
    const members = await MembersModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        data: members,
    })
})


// fest details 

module.exports.festDetails = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const fest = await FestModel.findById(_id).populate("events")
    res.status(200).json({
        success: true,
        data: fest,
    })
})