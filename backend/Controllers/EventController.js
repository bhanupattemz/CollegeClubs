const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const EventModel = require("../Models/eventModel")
const ClubModel = require("../Models/Clubs/clubsModel")
const StudentModel = require("../Models/Users/studentModel")
const sendMail = require("../Utils/sendMail")
const { eventCertificate } = require("../Utils/certificates")
const { createPDF } = require("../Utils/CreateFile")
const { deleteFromClodinary } = require("../functionalities")
const AdministrationModel = require("../Models/administrationModel")
module.exports.getAllEvents = WrapAsync(async (req, res) => {
    let { key } = req.query
    const filter = {
        $or: [
            { name: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
        ],
    };
    const events = await EventModel.find(filter).sort({ createdAt: 1 });
    res.status(200).json({
        success: true,
        data: events
    })
})

module.exports.getActiveEvents = WrapAsync(async (req, res) => {
    let { key } = req.query
    const filter = {
        $or: [
            { name: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
        ],
        isactive: true
    };
    const events = await EventModel.find(filter).sort({ createdAt: 1 });
    res.status(200).json({
        success: true,
        data: events
    })
})


module.exports.getOneEvent = WrapAsync(async (req, res) => {
    const { _id } = req.params
    let event = await EventModel.findOne({ _id }).populate({ path: "conductedClub" })
    if (!event.isactive && req.user.role !== "admin") {
        const userClubs = await ClubModel.find({ coordinators: { details: req.user._id } })
        const isCoordinator = userClubs.some(club => club._id.toString() === event.conductedClub.toString());
        if (!isCoordinator) {
            throw new ExpressError("You are not allowed to edit this Event.", 403)
        }
    }
    event = await EventModel.findOne({ _id }).populate({ path: "conductedClub", select: "name logo" })
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
    const event = await EventModel.findOne({ _id }).populate({ path: "conductedClub", select: "name logo" }).populate({ path: "members" })
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    res.status(200).json({
        success: true,
        data: event
    })
})


module.exports.getUserEvents = WrapAsync(async (req, res) => {
    const { _id } = req.params
    if (req.user._id.toString() != _id && req.user.role != "admin") {
        throw new ExpressError("You do not have permission to access this resource.", 403)
    }
    const events = await EventModel.find({ members: { $in: _id }, isactive: true }).sort({ createdAt: 1 })
    if (!events) {
        throw new ExpressError("events not found", 404);
    }
    res.status(200).json({
        success: true,
        data: events
    })
})


module.exports.getclubEvents = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const club = await ClubModel.findById(_id)
    if (!club) {
        throw new ExpressError("Club not found", 404);

    }
    const events = await EventModel.find({ conductedClub: { $in: [_id] }, isactive: true }).sort({ "timings.starting": - 1 })
    res.status(200).json({
        success: true,
        data: events
    })
})

module.exports.createEvent = WrapAsync(async (req, res, next) => {
    const bodyData = req.body
    const { club_id } = req.params
    if (!bodyData.conductedClub.includes(club_id)) {
        throw new ExpressError("created club must include in conducted Club", 400)
    }
    const createdClub = await ClubModel.findOne({ _id: club_id, coordinators: { $elemMatch: { details: req.user._id } } })
    if (!createdClub && req.user.role != "admin") {
        throw new ExpressError("must be Coordinator of Created Club", 400)
    }
    let isactive = req.user.role == "admin" ? true : false
    let image;
    if (req.file) {
        image = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    } else {
        image = {
            public_id: "default",
            url: "https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg"
        };
    }
    let event = {
        name: bodyData.name,
        venue: {
            landMark: bodyData.landMark,
            venueName: bodyData.venueName
        },
        description: bodyData.description,
        timings: {
            starting: new Date(bodyData.starting),
            ending: new Date(bodyData.ending)
        },
        registration: {
            starting: new Date(bodyData.Regstarting),
            ending: new Date(bodyData.Regending)
        },
        conductedClub: bodyData.conductedClub && JSON.parse(bodyData.conductedClub),
        image: image
    };

    let newEvent = EventModel({ ...event, isactive, createdClub: club_id })
    await newEvent.save()
    newEvent = await EventModel.findById(newEvent._id).populate({ path: "conductedClub", select: "name logo" })
    res.status(200).json({
        success: true,
        data: newEvent
    })
})

module.exports.setEvent = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const { isactive } = req.query
    const event = await EventModel.findByIdAndUpdate(_id, { isactive })
    const allEvents = await EventModel.find({ isactive: false }).sort({ createdAt: 1 })
    res.status(200).json({
        success: true,
        data: allEvents
    })
})

module.exports.updateEvent = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const bodyData = req.body
    const event = await EventModel.findById(_id);
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    const userClubs = await ClubModel.find({ coordinators: { details: req.user._id } })
    const isCoordinator = userClubs.some(club => club._id.toString() === event.conductedClub.toString());
    if (!isCoordinator && req.user.role !== "admin") {
        throw new ExpressError("You are not allowed to edit this Event.", 403)
    }
    let image;
    if (req.file) {
        deleteFromClodinary(event.image)
        image = {
            public_id: req.file.filename,
            url: req.file.path,
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
        description: bodyData.description,
        timings: {
            starting: new Date(bodyData.starting),
            ending: new Date(bodyData.ending)
        },
        registration: {
            starting: new Date(bodyData.Regstarting),
            ending: new Date(bodyData.Regending)
        },
        conductedClub: bodyData.conductedClub && JSON.parse(bodyData.conductedClub),
        image: image,
        isactive: req.user.role == "admin" ? bodyData.isactive ?? event.isactive : false,
        createdClub: bodyData.createdClub ? bodyData.createdClub : event.createdClub
    };

    const updatedData = await EventModel.findByIdAndUpdate(_id, { ...updatedEvent }, { new: true, runValidators: true }).populate({ path: "conductedClub", select: "name logo" })
    res.status(200).json({
        success: true,
        data: updatedData
    })
})



module.exports.deleteEvent = WrapAsync(async (req, res) => {
    const { _id } = req.params;
    const event = await EventModel.findById(_id);
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    const userClubs = await ClubModel.find({ coordinators: { details: req.user._id } })
    const isCoordinator = userClubs.some(club => club._id.toString() === event.conductedClub.toString());
    if (!isCoordinator && req.user.role !== "admin") {
        throw new ExpressError("You are not allowed to edit this Event.", 403)
    }
    await EventModel.findOneAndDelete({ _id })
    const allEvents = await EventModel.find().sort({ createdAt: 1 })
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
    const userClubs = await ClubModel.find({ coordinators: { details: req.user._id } })
    const isCoordinator = userClubs.some(club => club._id.toString() === event.conductedClub.toString());
    if (!isCoordinator && req.user.role !== "admin") {
        throw new ExpressError("You are not allowed to edit this Event.", 403)
    }
    if (event.registration.ending < Date.now() && req.user.role != "admin") {
        throw new ExpressError("unable to update.", 400)
    }
    for (let addclub of addClubs) {
        if (!event.conductedClub.includes(addclub)) {
            const club = await ClubModel.findByIdAndUpdate(
                addclub,
                { $push: { events: _id } },
                { new: true }
            );
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

    for (let deleteclub of deleteClubs) {
        const club = await ClubModel.findByIdAndUpdate(
            deleteclub,
            { $pull: { events: _id } },
            { new: true }
        );
    }
    res.status(200).json({
        success: true
    });
});



module.exports.registerMember = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const event = await EventModel.findById(_id)
    if (!["coordinator", "student"].includes(req.user.role)) {
        throw new ExpressError("Not allow to register.", 400)
    }
    if (!event) {
        throw new ExpressError("event not found", 404);
    }
    if (event.registration.starting > Date.now() && event.registration.ending < Date.now()) {
        throw new ExpressError("unable to register.", 400)
    }
    if (event.members.includes(req.user._id)) {
        throw new ExpressError("already registered", 400)
    }
    const updatedEvent = await EventModel.findByIdAndUpdate(_id, { $push: { members: req.user } }, { new: true }).populate({ path: "conductedClub", select: "name logo" })
    res.status(200).json({
        success: true,
        data: updatedEvent
    })
})




module.exports.unregisterMember = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const { member } = req.body
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
    await EventModel.findByIdAndUpdate(_id, { $pull: { members: member } }, { new: true })
    const UpdatedClub = await EventModel.findById(_id).populate({
        path: "members",
        select: "personalInformation.firstname personalInformation.lastname personalInformation.gender personalInformation.mobileNo personalInformation.personalMail admissionNo course branch academicYear"
    })
    res.status(200).json({
        success: true,
        data: UpdatedClub.members
    })
})


module.exports.getEventMembers = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const event = await EventModel.findById(_id).populate({
        path: "members",
        select: "personalInformation.firstname personalInformation.lastname personalInformation.gender personalInformation.mobileNo personalInformation.personalMail admissionNo course branch academicYear"
    }).populate("conductedClub")
    if (!event) {
        throw new ExpressError("event not found", 404);
    }

    const userClubs = await ClubModel.find({ coordinators: { details: req.user._id } })
    const isCoordinator = userClubs.some(club => club._id.toString() === event.conductedClub.toString());
    if (!isCoordinator && req.user.role !== "admin") {
        throw new ExpressError("You are not allowed to edit this Event.", 403)
    }
    res.status(200).json({
        success: true,
        data: event.members
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
    let event = await EventModel.findOne({ _id, isactive: true });
    if (event.timings.ending > Date.now()) {
        throw new ExpressError("Event not yet Completed", 400)
    }
    if (!event) {
        throw new ExpressError("Event not found", 404);
    }
    const winners = [];
    const htmlContent = [];

    for (let userId of data) {
        const user = await StudentModel.findOne({ admissionNo: userId });
        if (!user) {
            throw new ExpressError("User not found", 404);
        }
        if (!event.members.includes(user._id)) {
            throw new ExpressError(`User is not participating in the event`, 400);
        }
        winners.push({
            admissionNo: user.admissionNo,
            name: `${user.personalInformation.lastname} ${user.personalInformation.firstname}`,
            course: user.course,
            gender: user.personalInformation.gender,
            mail: user.mail,
            academicYear: user.academicYear
        });
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
        data: event
    });
});




