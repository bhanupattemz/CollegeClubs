const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const options = { discriminatorKey: '__t', collection: 'users' };
const ClubsModel = require("../Clubs/clubsModel")
const EventsModel = require("../eventModel")
const PastMember = require("../PastMembers/pastStudent")
const { deleteFromClodinary } = require("../../functionalities")
const userSchema = new mongoose.Schema({
    mail: {
        type: String,
        unique: true,
        required: [true, "Please enter a valid email"],
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: [true, "Please enter a valid role"],
        enum: ['admin', 'coordinator', 'student', 'general']
    },
    personalInformation: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        profile: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        },
        personalMail: { type: String, match: [/.+\@.+\..+/, "Please enter a valid personal email"], required: true },
        mobileNo: { type: String, required: true },
        gender: { type: String, enum: ["male", 'female', 'others'], required: true },
        DOB: { type: Date, required: true }
    },
    createdAt: { type: Date, default: Date.now() },
    isBlocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date }
}, options);


userSchema.post("findOneAndDelete", async (user, next) => {
    if (user) {
        deleteFromClodinary(user.personalInformation.profile)
        try {
            if (user.role === "coordinator") {
                let managedClubs = await ClubsModel.find({ coordinators: { $elemMatch: { details: user._id } } }).select('name coordinators');
                managedClubs = managedClubs.map(club => {
                    let coordinatorAt = null;
                    club.coordinators.forEach((coordinator) => {
                        if (coordinator.details.equals(user._id)) {
                            coordinatorAt = coordinator.coordinatorAt;
                        }
                    });
                    return {
                        name: club.name,
                        duration: {
                            joined: coordinatorAt,
                            left: Date.now(),
                        }
                    }
                });
                await ClubsModel.updateMany(
                    { members: user._id },
                    { $pull: { members: user._id } }
                );
                const existedData = await PastMember.findOne({ admissionNo: user.admissionNo });
                if (existedData) {
                    await PastMember.findOneAndUpdate(
                        { admissionNo: user.admissionNo },
                        {
                            $push: {
                                managedClubs: { $each: managedClubs }
                            }
                        }
                    );
                } else {
                    const pastmember = {
                        admissionNo: user.admissionNo,
                        name: user.username,
                        mail: user.personalInformation.personalMail,
                        mobile: user.personalInformation.mobileNo,
                        managedClubs: managedClubs,
                        duration: {
                            joined: user.createdAt,
                            left: Date.now()
                        },
                        department: user.branch,
                        workedAs: "coordinator"
                    };
                    const pastUser = new PastMember(pastmember);
                    await pastUser.save();
                }
                await EventsModel.updateMany(
                    { members: user._id },
                    { $pull: { members: user._id } }
                );
                await ClubsModel.updateMany(
                    { coordinators: { $elemMatch: { details: user._id } } },
                    { $pull: { coordinators: { details: user._id } } }
                );
            } else if (user.role === "admin") {
                const PastUser = {
                    name: user.username,
                    mail: user.mail,
                    mobile: user.personalInformation.mobileNo,
                    duration: {
                        joined: user.createdAt,
                        left: Date.now()
                    },
                    department: user.department,
                    workedAs: user.workedAs
                };
            }
            next();
        } catch (err) {
            console.error("Error occurred:", err);
            next(err);
        }
    }
}
)
userSchema.plugin(passportLocalMongoose)
const User = mongoose.model('User', userSchema);

module.exports = User