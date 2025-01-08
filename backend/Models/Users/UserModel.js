const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const options = { discriminatorKey: '__t', collection: 'users' };
const ClubsModel = require("../Clubs/clubsModel")
const EventsModel = require("../eventModel")
const PastMember = require("../PastMembers/pastMembers")
const PastAdmin = require("../PastMembers/pastAdmin");
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
        try {
            if (user.role === "student" || user.role === "coordinator") {
                let registeredClubs = await ClubsModel.find({ members: user._id }).select('name');
                registeredClubs = registeredClubs.map(club => club.name);

                let managedClubs = await ClubsModel.find({ coordinators: user._id }).select('name');
                managedClubs = managedClubs.map(club => club.name);


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
                                registeredClubs: { $each: registeredClubs },
                                managedClubs: { $each: managedClubs }
                            }
                        }
                    );
                } else {

                    const pastmember = {
                        admissionNo: user.admissionNo,
                        name: user.username,
                        mail: user.personalInformation.personalMail || user.mail,
                        mobile: user.personalInformation.mobileNo,
                        registeredClubs: registeredClubs,
                        managedClubs: managedClubs,
                        description: user.description,
                        duration: {
                            joined: user.createdAt,
                            left: Date.now()
                        },
                        department: user.branch
                    };

                    if (registeredClubs.length > 0 || managedClubs.length > 0) {
                        const pastUser = new PastMember(pastmember);
                        await pastUser.save();
                    }
                }


                await EventsModel.updateMany(
                    { members: user._id },
                    { $pull: { members: user._id } }
                );


                if (user.role === "coordinator") {
                    await ClubsModel.updateMany(
                        { coordinators: user._id },
                        { $pull: { coordinators: user._id } }
                    );
                }

            } else if (user.role === "admin") {

                const PastUser = {
                    name: user.username,
                    mail: user.personalInformation.personalMail || user.mail,
                    mobile: user.personalInformation.mobileNo,
                    description: user.description,
                    duration: {
                        joined: user.createdAt,
                        left: Date.now()
                    },
                    department: user.department,
                    workedAs: user.workedAs
                };

                const pastAdmin = new PastAdmin(PastUser);
                await pastAdmin.save();
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