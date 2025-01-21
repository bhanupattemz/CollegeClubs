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

module.exports.getOneClub = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const club = await ClubModel.findById(_id).populate({ path: "coordinators.details", select: "description personalInformation.profile personalInformation.firstname personalInformation.lastname" })
    if (!club) {
        throw new ExpressError("club not found", 404);
    }
    res.status(200).json({
        success: true,
        data: club
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
    const data = req.body
    for (let coordinator of data.coordinators) {
        coordinator = await StudentModel.findById(coordinator)
        if (!coordinator) {
            throw new ExpressError(`coordinator not found`, 404)
        }
        if (coordinator.role !== "coordinator") {
            throw new ExpressError(`${coordinator.username} is not in  the role of coordinator`, 403)
        }
    }
    const club = new ClubModel(req.body)
    await club.save()
    const allClubs = await ClubModel.find();
    res.status(200).json({
        success: true,
        data: allClubs
    });
});


module.exports.updateClub = WrapAsync(async (req, res, next) => {
    const updatedclub = req.body;
    const { _id } = req.params;
    const club = await ClubModel.findById(_id);
    if (!club) {
        throw new ExpressError("club not found", 404);
    }
    await ClubModel.findByIdAndUpdate(_id, { ...updatedclub, updatedAt: Date.now() }, { new: true, runValidators: true })
    const allclubs = await ClubModel.find()
    res.status(200).json({
        success: true,
        data: allclubs
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
    if (club.timings.starting > Date.now()) {
        throw new ExpressError("Club registration has not started yet.", 400);
    }
    if (club.timings.ending < Date.now()) {
        throw new ExpressError("Club registration has already ended.", 400);
    }
    if (club.members.includes(req.user._id.toString())) {
        throw new ExpressError("Member already exists", 400);
    }

    const UpdatedClub = await ClubModel.findByIdAndUpdate(_id, { $push: { members: req.user } }, { new: true })
    res.status(200).json({
        success: true,
        data: UpdatedClub
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
    let clubs = await ClubModel.find().populate("members").populate("coordinators")

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
            const options = {
                mail: coordinator.mail,
                subject: `${club.name} members`,
                text: `${club.name} members`,
                message: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
                        <h2 style="font-size: 20px; color: #333333; margin-bottom: 10px;">Hello, ${coordinator.personalInformation.firstname},</h2>
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