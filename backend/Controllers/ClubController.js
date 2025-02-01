const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const ClubModel = require("../Models/Clubs/clubsModel")
const StudentModel = require("../Models/Users/studentModel")
const { convertObjectToExcel } = require("../Utils/CreateFile")
const sendMail = require("../Utils/sendMail")
const UnverifiedCoordinatorModel = require("../Models/Users/unverifiedCoordinatorModel")
const unverifiedCoordinatorModel = require("../Models/Users/unverifiedCoordinatorModel")
const PastStudentModel = require("../Models/PastMembers/pastStudent")
const functionalities = require("../functionalities")
module.exports.getAllClubs = WrapAsync(async (req, res) => {
    const { key } = req.query

    const clubs = await ClubModel.find({
        $or: [
            { name: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
        ]
    }).sort({ createdAt: 1 });
    res.status(200).json({
        success: true,
        data: clubs
    })
})

module.exports.getCoordinatorClubs = WrapAsync(async (req, res) => {
    const { key } = req.query
    const clubs = await ClubModel.find({
        "coordinators.details": req.user._id,
        $or: [
            { name: { $regex: new RegExp(key, "i") } },
            { _id: key && key.length === 24 ? key : undefined },
        ]
    }).sort({ createdAt: 1 });
    res.status(200).json({
        success: true,
        data: clubs
    })
})

module.exports.getOneClub = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const club = await ClubModel.findById(_id).populate({ path: "coordinators.details", select: "admissionNo description personalInformation.profile personalInformation.firstname personalInformation.lastname" })
    if (!club) {
        throw new ExpressError("club not found", 404);
    }
    res.status(200).json({
        success: true,
        data: club
    })
})

module.exports.getClubMembers = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const club = await ClubModel.findById(_id).populate({
        path: "members",
        select: "personalInformation.firstname personalInformation.lastname personalInformation.gender personalInformation.mobileNo personalInformation.personalMail admissionNo branch course academicYear"
    })
    if (!club) {
        throw new ExpressError("club not found", 404);
    }
    let coordinators = club.coordinators.map((item) => { return item.details.toString() })
    if (!coordinators.includes(req.user._id.toString()) && req.user.role != "admin") {
        throw new ExpressError("Not have permision for that", 400)
    }
    res.status(200).json({
        success: true,
        data: club.members
    })
})


module.exports.getUserClubs = WrapAsync(async (req, res) => {
    const { _id } = req.params
    if (req.user._id.toString() != _id && req.user.role != "admin") {
        throw new ExpressError("You do not have permission to access this resource.", 403)
    }
    const club = await ClubModel.find({ members: { $in: _id } })
    if (!club) {
        throw new ExpressError("club not found", 404);
    }
    res.status(200).json({
        success: true,
        data: club
    })
})
module.exports.createClub = WrapAsync(async (req, res, next) => {
    const bodyData = req.body;
    let bannerImage, logo;

    if (req.files?.["bannerImage"]) {
        bannerImage = {
            public_id: req.files["bannerImage"][0].filename,
            url: req.files["bannerImage"][0].path,
        };
    }
    if (req.files?.["logo"]) {
        logo = {
            public_id: req.files["logo"][0].filename,
            url: req.files["logo"][0].path,
        };
    }

    if (!bannerImage) {
        if (logo) await functionalities.deleteFromClodinary(logo);
        throw new ExpressError("bannerImage is required.", 400);
    }
    if (!logo) {
        if (bannerImage) await functionalities.deleteFromClodinary(bannerImage);
        throw new ExpressError("logo is required.", 400);
    }

    let clubData = {
        name: bodyData.name,
        type: bodyData.type,
        venue: {
            landMark: bodyData.landMark,
            venueName: bodyData.venueName
        },
        description: bodyData.description,
        bannerImage,
        logo,
        registrationTiming: bodyData.registrationTiming ? JSON.parse(bodyData.registrationTiming) : null,
        skills: bodyData.skills ? JSON.parse(bodyData.skills) : [],
        timings: bodyData.timings ? JSON.parse(bodyData.timings) : [],
        coordinators: []
    };

    let club = new ClubModel(clubData);
    let coordinators = bodyData.coordinators ? JSON.parse(bodyData.coordinators) : [];

    for (let coordinatorId of coordinators) {
        let coordinator = await StudentModel.findById(coordinatorId);
        if (!coordinator) throw new ExpressError(`Coordinator not found`, 404);

        if (coordinator.role !== "coordinator") {
            const unverifiedCoordinator = new unverifiedCoordinatorModel({ user: coordinator._id, club: club._id });
            await unverifiedCoordinator.save();
            const options = await functionalities.sendverifyCoordinatorMailOptions(coordinator, club, unverifiedCoordinator._id);
            await sendMail(options);
        } else {
            club.coordinators.push({ details: coordinator._id });
        }
    }

    await club.save();
    res.status(200).json({ success: true, data: club });
});


module.exports.updateClub = WrapAsync(async (req, res, next) => {
    const bodyData = req.body;
    let bannerImage, logo;
    const { _id } = req.params
    const club = await ClubModel.findById(_id)
    let iscoordinators = club.coordinators.map((item) => { return item.details.toString() })
    if (!iscoordinators.includes(req.user._id.toString()) && req.user.role != "admin") {
        throw new ExpressError("Not have permision for Update", 400)
    }
    if (req.files?.["bannerImage"]) {
        functionalities.deleteFromClodinary(club.bannerImage)
        bannerImage = {
            public_id: req.files["bannerImage"][0].filename,
            url: req.files["bannerImage"][0].path,
        };
    } else {
        bannerImage = club && club.bannerImage
    }
    if (req.files?.["logo"]) {
        functionalities.deleteFromClodinary(club.logo)
        logo = {
            public_id: req.files["logo"][0].filename,
            url: req.files["logo"][0].path,
        };
    } else {
        logo = club && club.logo
    }
    if (!club) {
        if (logo) functionalities.deleteFromClodinary(logo);
        if (bannerImage) functionalities.deleteFromClodinary(bannerImage);
        throw new ExpressError("club Not Found", 404)
    }
    let clubData = {
        name: bodyData.name ? bodyData.name : club.name,
        type: bodyData.type ? bodyData.type : club.type,
        venue: {
            landMark: bodyData.landMark,
            venueName: bodyData.venueName
        },
        description: bodyData.description,
        bannerImage,
        logo,
        registrationTiming: (bodyData.registrationTiming && bodyData.registrationTiming != "undefined") ? JSON.parse(bodyData.registrationTiming) : club.registrationTiming,
        skills: (bodyData.skills && bodyData.skills != "undefined") ? JSON.parse(bodyData.skills) : club.skills,
        timings: (bodyData.timings && bodyData.timings != "undefined") ? JSON.parse(bodyData.timings) : club.timings,
    };
    if (bodyData.coordinators && bodyData.coordinators != "undefined") {
        clubData.coordinators = []
        let coordinators = JSON.parse(bodyData.coordinators);
        for (let coordinatorId of coordinators) {
            let coordinator = await StudentModel.findById(coordinatorId);
            if (!coordinator) throw new ExpressError(`Coordinator not found`, 404);
            if (coordinator.role !== "coordinator") {
                const unverifiedCoordinator = new unverifiedCoordinatorModel({ user: coordinator._id, club: club._id });
                await unverifiedCoordinator.save();
                const options = await functionalities.sendverifyCoordinatorMailOptions(coordinator, club, unverifiedCoordinator._id);
                await sendMail(options);
            } else {
                let pastcoor;
                for (let item of club.coordinators) {
                    if (item.details == coordinatorId) {
                        pastcoor = item.coordinatorAt
                    }
                }
                clubData.coordinators.push({ details: coordinator._id, coordinatorAt: pastcoor ? pastcoor : Date.now() });
            }
        }
    }

    const updatedClub = await ClubModel.findByIdAndUpdate(_id, clubData, { new: true, runValidators: true })
    res.status(200).json({
        success: true,
        data: updatedClub
    })
})

module.exports.deleteClub = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const club = await ClubModel.findById(_id);
    if (!club) {
        throw new ExpressError("club not found", 404);
    }
    await ClubModel.findOneAndDelete({ _id })
    const allclubs = await ClubModel.find()
    res.status(200).json({
        success: true,
        data: allclubs
    })
})

module.exports.updateCoordinators = WrapAsync(async (req, res) => {
    const { _id } = req.params;
    const { deleteUsers, addUsers } = req.body;

    const club = await ClubModel.findById(_id);
    if (!club) {
        throw new ExpressError(`Club with ID ${_id} not found.`, 404);
    }


    for (let addUser of addUsers) {
        const user = await StudentModel.findById(addUser);
        if (user) {
            if (user.role === "coordinator") {
                club.coordinators.forEach((coordinator) => {
                    if (coordinator.details == addUser) {
                        throw new ExpressError("Already coordinator for this club", 400);
                    }
                });
                await ClubModel.findByIdAndUpdate(_id, {
                    $push: { coordinators: { details: user._id } },
                    updatedAt: Date.now(),
                });
            } else {
                const unverifiedCoordinator = new unverifiedCoordinatorModel({ user: user._id, club: _id });
                await unverifiedCoordinator.save();

                const options = await functionalities.sendverifyCoordinatorMailOptions(user, club, unverifiedCoordinator._id);
                sendMail(options);
            }
        }
    }

    await ClubModel.findByIdAndUpdate(
        _id,
        {
            $pull: { coordinators: { $in: deleteUsers } },
            updatedAt: Date.now(),
        },
        { new: true }
    );

    for (let item of deleteUsers) {
        let coordinatorAt = null;

        club.coordinators.forEach((coordinator) => {
            if (coordinator.details == item) {
                coordinatorAt = coordinator.coordinatorAt;
            }
        });

        const cordinatingClubs = await ClubModel.find({ coordinators: { details: { $in: [item] } } });
        const user = await StudentModel.findById(item);

        if (!cordinatingClubs || cordinatingClubs.length === 0) {
            await StudentModel.findByIdAndUpdate(item, { role: "student" });
        }

        const pastUser = await PastStudentModel.findOne({ admissionNo: user.admissionNo });
        const managedClubData = {
            name: club.name,
            duration: {
                joined: coordinatorAt,
                left: Date.now(),
            },
        };

        if (!pastUser) {
            const pastUserData = {
                name: `${user.personalInformation.firstname} ${user.personalInformation.lastname}`,
                mail: user.personalInformation.personalMail,
                mobileNo: user.personalInformation.mobileNo,
                department: user.role === "admin" ? user.department : user.branch,
                duration: {
                    joined: user.createdAt,
                    left: Date.now(),
                },
                workedAs: user.role === "admin" ? user.workedAs : user.role,
                admissionNo: user.admissionNo,
                managedClub: [managedClubData],
            };
            const pastMember = new PastStudentModel(pastUserData);
            await pastMember.save();
        } else {
            await PastStudentModel.findOneAndUpdate(
                { admissionNo: user.admissionNo },
                { $push: { managedClub: managedClubData } }
            );
        }
    }

    res.status(200).json({
        success: true,
        club,
    });
});



module.exports.registerMember = WrapAsync(async (req, res) => {
    const { _id } = req.params
    if (!["coordinator", "student"].includes(req.user.role)) {
        throw new ExpressError("Not allow to register.", 400)
    }
    const club = await ClubModel.findById(_id);
    if (!club) {
        throw new ExpressError("club not found", 404);
    }
    if (club.registrationTiming.starting > Date.now()) {
        throw new ExpressError("Club registration has not started yet.", 400);
    }
    if (club.registrationTiming.ending < Date.now()) {
        throw new ExpressError("Club registration has already ended.", 400);
    }
    if (club.members.includes(req.user._id.toString())) {
        throw new ExpressError("Member already exists", 400);
    }
    const UpdatedClub = await ClubModel.findByIdAndUpdate(_id, { $push: { members: req.user._id } }, { new: true })
    res.status(200).json({
        success: true,
        data: UpdatedClub
    })
})



module.exports.unregisterMember = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const { member } = req.body
    const club = await ClubModel.findById(_id);
    if (!club) {
        throw new ExpressError("club not found", 404);
    }
    if (!club.members.includes(member)) {
        throw new ExpressError("Not A Member in clubs", 400);
    }
    let coordinators = club.coordinators.map((item) => { return item.details.toString() })
    if (!coordinators.includes(req.user._id.toString()) && req.user.role != "admin") {
        throw new ExpressError("Not have permision for that", 400)
    }
    await ClubModel.findByIdAndUpdate(_id, { $pull: { members: member } }, { new: true })
    const UpdatedClub = await ClubModel.findById(_id).populate({
        path: "members",
        select: "personalInformation.firstname personalInformation.lastname personalInformation.gender personalInformation.mobileNo personalInformation.personalMail admissionNo branch course academicYear"
    })
    res.status(200).json({
        success: true,
        data: UpdatedClub.members
    })
})

module.exports.updateSingleRegistrationTime = WrapAsync(async (req, res) => {
    const timings = req.body
    const { _id } = req.params
    const club = await ClubModel.findByIdAndUpdate(_id, { timings, updatedAt: Date.now() })
    if (!club) {
        throw new ExpressError("club not found", 404);
    }
    res.status(200).json({
        success: true,
        club
    })
})

module.exports.updateAllRegistrationTime = WrapAsync(async (req, res) => {
    const timings = req.body
    const clubs = await ClubModel.find()
    for (let club of clubs) {
        club = await ClubModel.findByIdAndUpdate(club._id, { registrationTiming: timings })
    }
    res.status(200).json({
        success: true
    })
})

module.exports.sendClubMembersToCoordinator = WrapAsync(async (req, res) => {
    let clubs = await ClubModel.find().populate("members").populate("coordinators.details")

    for (let club of clubs) {
        if (club.members.length <= 0) {
            continue
        }
        let headers = [
            { header: 'Admission No', key: 'AdmissionNo', width: 20 },
            { header: 'Name', key: 'Name', width: 20 },
            { header: 'Branch', key: 'Branch', width: 20 },
            { header: 'Course', key: 'Course', width: 20 },
            { header: 'Gender', key: 'Gender', width: 20 },
            { header: 'Mail', key: 'Mail', width: 20 },
            { header: 'Mobile', key: 'Mobile', width: 20 },
        ]
        let content = club.members.map((member, inx) => {
            return {
                AdmissionNo: member.admissionNo,
                Name: `${member.personalInformation.firstname} ${member.personalInformation.lastname}`,
                Branch: member.branch,
                Course: member.course,
                Gender: member.personalInformation.gender,
                Mail: member.personalInformation.personalMail || member.mail,
                Mobile: member.personalInformation.mobileNo || "NO DATA"
            }
        })
        let databuffer = await convertObjectToExcel(content, headers)

        for (let coordinator of club.coordinators) {
            if (!coordinator.details) {
                continue
            }
            const options = {
                mail: coordinator.details.mail,
                subject: `${club.name} members`,
                text: `${club.name} members`,
                message: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
                        <h2 style="font-size: 20px; color: #333333; margin-bottom: 10px;">Hello, ${coordinator.details.personalInformation.firstname},</h2>
                        <p style="font-size: 16px; color: #555555;">
                            We hope this message finds you well! We are excited to share the member list of your club, <strong>${club.name}</strong>.
                        </p>
                        <p style="font-size: 16px; color: #555555;">
                            Please find attached the Excel sheet containing the details of the members. If you have any questions or need further assistance, feel free to reach out.
                        </p>
                        <p style="font-size: 14px; color: #777777; margin-top: 20px;">
                            Best regards,<br>
                            The Club Management Team
                        </p>
                    </div>
                `,
                attachments: [
                    {
                        filename: `${club.name}_members.xlsx`,
                        content: databuffer,
                        contentType: 'application/xlsx'
                    },
                ],
            };
            const mailData = await sendMail(options)
            if (!mailData) {
                console.log("failed to send mail: ", mailData)
            }
        }
    }
    res.status(200).json({
        success: true
    })

})