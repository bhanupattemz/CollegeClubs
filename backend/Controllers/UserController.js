const WrapAsync = require("../Utils/WrapAsync")
const ExpressError = require("../Utils/ExpressError")
const sendMail = require("../Utils/sendMail")
require("dotenv").config()
const { deleteFromClodinary } = require("../functionalities")
const functionalities = require("../functionalities")
const unverifiedCoordinatorModel = require("../Models/Users/unverifiedCoordinatorModel")
const ClubModel = require("../Models/Clubs/clubsModel")
//models
const UserModel = require("../Models/Users/UserModel")
const GenericUserModel = require("../Models/Users/genericUserModel")
const AdminModel = require("../Models/Users/adminModel")
const StudentModel = require("../Models/Users/studentModel")
const UnverifiedUser = require("../Models/Users/unverifiedUserModel")
const UnverifiedAdmin = require("../Models/Users/unverifiedAdminModel")
var CryptoJS = require("crypto-js");
const { v4: uuid } = require('uuid')
const passport = require("passport")
const unverifiedAdminModel = require("../Models/Users/unverifiedAdminModel")


module.exports.currentUser = WrapAsync(async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
        isauthenticate: req.user ? true : false
    })
})
module.exports.genarateSignup = WrapAsync(async (req, res) => {
    const otp = Math.floor(Math.random() * 900000) + 100000;
    const { mail, role } = req.body;
    const user = await UserModel.findOne({ mail })
    if (user) {
        throw new ExpressError("User Already exicts", 409)
    }
    if (role === "student" && mail.split("@")[1] != "jntua.ac.in") {
        throw new ExpressError("Students must use their college email (e.g., name@jntua.ac.in).", 400)
    }
    let unverifiedUser = await UnverifiedUser.findOne({ mail })
    const options = {
        mail: mail,
        subject: "College Clubs Mail Verification",
        text: "College Clubs Mail Verification",
        message: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #0A5EB0; text-align: center;">College Clubs Mail Verification</h2>
                <p>Dear User,</p>
                <p>Thank you for signing up with <strong>College Clubs</strong>. Please use the OTP below to verify your email address:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="
                        display: inline-block;
                        background-color:rgb(255, 255, 255);
                        padding: 10px 20px;
                        font-size: 20px;
                        font-weight: bold;
                        color: #0A5EB0;
                        border-radius: 5px;
                        border: 1px solidrgb(129, 129, 129);
                    ">${otp}</span>
                </div>
                <p>If you did not request this verification, please ignore this email or contact support.</p>
                <p style="color: #555;">Best regards,<br>College Clubs Team</p>
                <hr style="border: 0; height: 1px; background: #eee; margin: 20px 0;">
                <footer style="text-align: center; font-size: 12px; color: #aaa;">
                    This is an automated message. Please do not reply to this email.
                </footer>
            </div>
        `
    }

    const data = sendMail(options)

    if (!data) {
        throw new ExpressError("Failed to Send OTP", 500)
    }
    if (unverifiedUser) {
        const dateTime = Date.now()
        await UnverifiedUser.findOneAndUpdate({ mail }, { otp, dateTime, isverified: false, role }, { new: true, runValidators: true })
    } else {
        unverifiedUser = new UnverifiedUser({ mail, otp, role })
        await unverifiedUser.save()
    }

    res.status(200).json({
        success: true
    })
})

module.exports.verifySignUpMail = WrapAsync(async (req, res) => {
    const { mail, otp } = req.body;
    let unverifiedUser = await UnverifiedUser.findOne({ mail })
    if (!unverifiedUser) {
        throw new ExpressError("Mail Not Found", 404)
    }

    if (new Date(unverifiedUser.dateTime).getTime() > Date.now() + 15 * 60 * 1000) {
        await UnverifiedUser.deleteOne({ mail })
        throw new ExpressError("OTP has expired", 410)
    }
    if (unverifiedUser.otp != otp) {
        throw new ExpressError("OTP mismatch", 400)
    } else {
        await UnverifiedUser.findOneAndUpdate({ mail }, { isverified: true }, { new: true, runValidators: true })
        res.status(200).json({
            success: true
        })
    }
})

module.exports.signup = WrapAsync(async (req, res) => {
    const bodyData = req.body;

    let profile;
    if (req.file) {
        profile = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    } else {
        profile = {
            public_id: "default",
            url: "https://res.cloudinary.com/delc5g3p5/image/upload/v1735839043/Clubs/cnc3vuovzqifv10fexyq.png"
        };
    }

    const password = bodyData.password;
    if (password.length < 8) {
        deleteFromClodinary(profile)
        throw new ExpressError("Passsword Must be atleast 8 digits", 400)
    }
    let user;
    const unverifiedUser = await UnverifiedUser.findOne({ mail: bodyData.mail })

    if (!unverifiedUser || !unverifiedUser.isverified) {
        deleteFromClodinary(profile)
        throw new ExpressError("Mail Not Verified", 401)
    }

    let data = {
        mail: bodyData.mail,
        username: bodyData.username,
        password: bodyData.password,
        role: unverifiedUser.role,
        personalInformation: {
            firstname: bodyData.firstname,
            lastname: bodyData.lastname,
            gender: bodyData.gender,
            personalMail: bodyData.personalMail,
            DOB: bodyData.DOB,
            mobileNo: bodyData.mobileNo,
            profile
        },
        admissionNo: bodyData.admissionNo,
        course: bodyData.course,
        branch: bodyData.branch,
        academicYear: bodyData.academicYear
    }
    if (data.role === "student") {
        let datacheck = data.mail.split("@")
        if (datacheck[1] !== "jntua.ac.in") {
            deleteFromClodinary(profile)
            throw new ExpressError("Mail must be student mail, provided by college", 400)
        }
        if (datacheck[0].toLocaleLowerCase() !== data.admissionNo.toLocaleLowerCase()) {
            deleteFromClodinary(profile)
            throw new ExpressError("Admission Number is not match to mail.", 400)
        }
        user = new StudentModel(data)
    } else if (data.role === "general") {
        user = new GenericUserModel(data)
    } else {
        deleteFromClodinary(profile)
        throw new ExpressError("Invalid input data", 400)
    }
    const newUser = await UserModel.register(user, password);
    await UnverifiedUser.deleteOne({ _id: unverifiedUser._id })
    req.logIn(newUser, (err) => {
        if (err) return next(err);
        res.status(200).json({
            success: "user register success",
            user: newUser,
            isauthenticate: true
        });
    });

})


module.exports.updateUser = WrapAsync(async (req, res, next) => {
    const bodyData = req.body;
    const user = await UserModel.findById(req.user._id);
    if (!user) {
        throw new ExpressError("User not found", 404);
    }
    let profile;
    if (req.file) {
        deleteFromClodinary(user.personalInformation.profile)
        profile = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    }
    let updateduser = {
        username: bodyData.username,
        personalInformation: {
            firstname: bodyData.firstname ? bodyData.firstname : user.personalInformation.firstname,
            lastname: bodyData.lastname ? bodyData.lastname : user.personalInformation.lastname,
            gender: bodyData.gender ? bodyData.gender : user.personalInformation.gender,
            personalMail: bodyData.personalMail ? bodyData.personalMail : user.personalInformation.personalMail,
            DOB: bodyData.DOB ? bodyData.DOB : user.personalInformation.DOB,
            mobileNo: bodyData.mobileNo ? bodyData.mobileNo : user.personalInformation.mobileNo,
            profile: profile ? profile : user.personalInformation.profile
        },
        course: bodyData.course,
        branch: bodyData.branch,
        academicYear: bodyData.academicYear,
        department: bodyData.department
    }
    if (["coordinator", "student"].includes(req.user.role)) {
        await StudentModel.findByIdAndUpdate(req.user._id, updateduser, { new: true, runValidators: true })
    } else if (user.role == "admin") {
        await AdminModel.findByIdAndUpdate(req.user._id, updateduser, { new: true, runValidators: true })
    } else {
        await UserModel.findByIdAndUpdate(req.user._id, updateduser, { new: true, runValidators: true })
    }
    const currentUser = await UserModel.findById(req.user._id)
    res.status(200).json({
        success: true,
        data: currentUser
    })


})


module.exports.signin = (req, res) => {
    res.status(200).json({
        success: "login user success",
        data: req.user,
        isauthenticate: true
    })
}

module.exports.signout = (req, res) => {
    req.logOut((err) => {
        if (err) return next(err);
        res.status(200).json({
            success: "Logout successfully",
            isauthenticate: false
        });
    });
}



//admin 

module.exports.getAllUsers = WrapAsync(async (req, res) => {
    const { key } = req.query
    const users = await UserModel.find({
        $or: [
            { username: { $regex: new RegExp(key, 'i') } },
            { _id: key && key.length === 24 ? key : undefined },
            { mail: { $regex: new RegExp(key, 'i') } },
            { personalInformation: { firstname: { $regex: new RegExp(key, 'i') } } },
            { admissionNo: { $regex: new RegExp(key, 'i') } },
            { role: { $regex: new RegExp(key, 'i') } }
        ]
    });
    res.status(200).json({
        success: true,
        data: users
    })
})

module.exports.getOneUser = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const user = await UserModel.findById(_id)
    if (!user) {
        throw new ExpressError("user not found", 404);

    }
    res.status(200).json({
        success: true,
        data: user
    })
})


module.exports.adminUpdateUser = WrapAsync(async (req, res, next) => {
    const bodyData = req.body;
    const { _id } = req.params;
    const user = await UserModel.findById(_id);
    if (!user) {
        throw new ExpressError("user not found", 404);
    }
    if (user.role == "admin" && _id != req.user._id) {
        throw new ExpressError("You are not authorized to update data for other admins.", 403)
    }
    let profile;
    if (req.file) {
        deleteFromClodinary(user.personalInformation.profile)
        profile = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    }
    let updateduser = {
        username: bodyData.username,
        personalInformation: {
            firstname: bodyData.firstname ? bodyData.firstname : user.personalInformation.firstname,
            lastname: bodyData.lastname ? bodyData.lastname : user.personalInformation.lastname,
            gender: bodyData.gender ? bodyData.gender : user.personalInformation.gender,
            personalMail: bodyData.personalMail ? bodyData.personalMail : user.personalInformation.personalMail,
            DOB: bodyData.DOB ? bodyData.DOB : user.personalInformation.DOB,
            mobileNo: bodyData.mobileNo ? bodyData.mobileNo : user.personalInformation.mobileNo,
            profile: profile ? profile : user.personalInformation.profile
        },
        course: bodyData.course,
        branch: bodyData.branch,
        academicYear: bodyData.academicYear
    }
    if (["coordinator", "student"].includes(user.role)) {
        await StudentModel.findByIdAndUpdate(user._id, updateduser, { new: true, runValidators: true })
    } else if (user.role == "admin") {
        await AdminModel.findByIdAndUpdate(user._id, updateduser, { new: true, runValidators: true })
    } else {
        await UserModel.findByIdAndUpdate(user._id, updateduser, { new: true, runValidators: true })
    }
    const currentUsers = await UserModel.find({})
    res.status(200).json({
        success: true,
        data: currentUsers
    })

})


module.exports.deleteUser = WrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const data = req.query
    const user = await UserModel.findById(_id);
    if (!user) {
        throw new ExpressError("user not found", 404);
    }
    if (user.role == "admin") {
        throw new ExpressError("You don't have access for delete admin.", 400)
    }
    const options = await functionalities.adminDeleteUserOptions(user, adminMessage = data.message)
    const respounce = await sendMail(options)
    if (!respounce) {
        throw new ExpressError("Failed to Send Mail to User", 500)
    }
    await UserModel.findOneAndDelete({ _id })
    const allusers = await UserModel.find()
    res.status(200).json({
        success: true,
        data: allusers
    })
})

module.exports.deleteCurrentUser = WrapAsync(async (req, res) => {
    const user = req.user
    if (user.role == "admin") {
        throw new ExpressError("Admin can't delete directly", 400)
    }
    await UserModel.findOneAndDelete({ _id: user._id })
    deleteFromClodinary(user.personalInformation.profile)
    req.logOut((err) => {
        if (err) return next(err);
        res.status(200).json({
            success: "Logout successfully"
        });
    });
})

module.exports.Admingenarate = WrapAsync(async (req, res) => {
    const { mail } = req.body
    const user = await UserModel.findOne({ mail })
    if (user) {
        throw new ExpressError(`User with mail ${mail}, already exists.`, 400)
    }
    const unverifiedAdmin = await unverifiedAdminModel({ mail, workedAs: req.user.workedAs })
    const options = await functionalities.adminGenerateMailOptions(mail, req.user, unverifiedAdmin._id)
    const data = sendMail(options)
    if (!data) {
        throw new ExpressError("Mail Sent Failed", 400)
    }
    await unverifiedAdmin.save()
    res.status(200).json({
        success: true
    })
})

module.exports.createAdmin = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const bodyData = req.body;

    let profile;
    if (req.file) {
        profile = {
            public_id: req.file.filename,
            url: req.file.path,
        };
    } else {
        profile = {
            public_id: "default",
            url: "https://res.cloudinary.com/delc5g3p5/image/upload/v1735839043/Clubs/cnc3vuovzqifv10fexyq.png"
        };
    }

    const password = bodyData.password;
    if (password.length < 8) {
        deleteFromClodinary(profile)
        throw new ExpressError("Passsword Must be atleast 8 digits", 400)
    }
    const unverifiedAdmin = await UnverifiedAdmin.findById(_id)
    if (!unverifiedAdmin) {
        deleteFromClodinary(profile)
        throw new ExpressError("User not found", 404)
    }
    if (unverifiedAdmin.mail !== bodyData.mail) {
        deleteFromClodinary(profile)
        throw new ExpressError("User Mail Not Match", 400)
    }
    if (unverifiedAdmin.timeDate < Date.now()) {
        deleteFromClodinary(profile)
        await unverifiedAdminModel.findByIdAndDelete(_id)
        throw new ExpressError("Time is Exprired", 400)
    }

    let data = {
        mail: bodyData.mail,
        username: bodyData.username,
        password: bodyData.password,
        role: "admin",
        personalInformation: {
            firstname: bodyData.firstname,
            lastname: bodyData.lastname,
            gender: bodyData.gender,
            personalMail: bodyData.personalMail,
            DOB: bodyData.DOB,
            mobileNo: bodyData.mobileNo,
            profile
        },
        department: bodyData.department,
        description: bodyData.description,
        workedAs: unverifiedAdmin.workedAs
    }
    const admin = await AdminModel(data)
    const newUser = await UserModel.register(admin, password);
    await AdminModel.findOneAndDelete({ workedAs: unverifiedAdmin.workedAs })
    await UnverifiedAdmin.findByIdAndDelete(_id)
    req.logIn(newUser, (err) => {
        if (err) return next(err);
        res.status(200).json({
            success: "user register success",
            data: newUser,
            isauthenticate: true
        });
    });
})

module.exports.verifyCoordinator = WrapAsync(async (req, res) => {
    const { _id } = req.params
    const data = req.body
    const unverifiedCoordinator = await unverifiedCoordinatorModel.findById(_id).populate("user")
    if (!unverifiedCoordinator || !data.description || !data.mail) {
        throw new ExpressError("Bad request", 400)
    }
    if (unverifiedCoordinator.user.mail != data.mail) {
        throw new ExpressError("Check you mail", 400)
    }
    if (unverifiedCoordinator.dateTime < Date.now()) {
        await unverifiedCoordinatorModel.deleteOne({ _id })
        throw new ExpressError("Time Expried", 400)
    }
    await ClubModel.findByIdAndUpdate(unverifiedCoordinator.club, { $push: { coordinators: { details: unverifiedCoordinator.user._id } }, updatedAt: Date.now() })
    const coordinator = await StudentModel.findByIdAndUpdate(unverifiedCoordinator.user, { role: "coordinator", description: data.description }, { new: true, runValidators: true })
    await unverifiedCoordinatorModel.deleteOne({ _id })
    res.status(200).json({
        success: true
    })
})



module.exports.createPasswordToken = WrapAsync(async (req, res) => {
    const token = uuid();
    const { mail } = req.body;
    const userData = await UserModel.findOne({ mail });
    if (!userData) {
        throw new ExpressError("User not found", 401);
    }
    const ciphertext = CryptoJS.AES.encrypt(token, process.env.SECRET_KEY).toString();
    const urlSafeCiphertext = Buffer.from(ciphertext, 'utf-8').toString('base64url');
    await UserModel.findOneAndUpdate({ mail }, {
        resetPasswordToken: token,
        resetPasswordExpire: Date.now() + 30 * 60 * 1000
    });


    const link = `${process.env.FRONTEND_URL}/password/reset/${urlSafeCiphertext}`;

    const options = {
        mail: mail,
        subject: "Password Reset Request",
        text: "Password Reset Request",
        message: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #4a90e2;">Hello ${userData.personalInformation.firstname}, @${userData.username}</h2>
                    <p style="font-size: 16px; line-height: 1.5;">
                        We received a request to reset your password. To proceed with the reset, please click the button below. This link will expire in 30 minutes for security purposes.
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${link}" style="display: inline-block; padding: 12px 20px; background-color: #4a90e2; color: #fff; text-decoration: none; font-weight: bold; border-radius: 5px;">
                            Reset Password
                        </a>
                    </div>
                    <p style="font-size: 14px; line-height: 1.5;">
                        If you didn't request this, you can ignore this email, and your password will remain unchanged.
                    </p>
                    <p style="font-size: 14px; color: #777;">
                        Best regards,<br>CollegeClubs Team
                    </p>
                </div>
        `
    };

    const data = await sendMail(options);
    if (data) {
        res.status(200).json({
            success: "Mail sent",
        });
    } else {
        throw new ExpressError("Mail not sent", 400);
    }
});

module.exports.resetPassword = WrapAsync(async (req, res) => {
    const { newpassword, confirmpassword, mail } = req.body;
    if (newpassword !== confirmpassword) {
        throw new ExpressError("Passwords do not match", 400);
    }
    const { token } = req.params;

    const decodedToken = Buffer.from(token, 'base64url').toString('utf-8');
    const bytes = CryptoJS.AES.decrypt(decodedToken, process.env.SECRET_KEY);
    const originalToken = bytes.toString(CryptoJS.enc.Utf8);
    const user = await UserModel.findOne({
        resetPasswordToken: originalToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        throw new ExpressError("Invalid or expired token", 400);
    }
    if (user.mail != mail) {
        throw new ExpressError("Invalid or expired token", 400);
    }
    user.setPassword(newpassword, async (err) => {
        if (err) throw new ExpressError("Error setting password", 500);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(200).json({ success: "Password reset successful" });
    });
});


module.exports.updatePassword = WrapAsync(async (req, res, next) => {
    const { _id } = req.user
    const passwords = req.body
    if (passwords.newpassword.length < 8) {
        throw new ExpressError("Passsword Must be atleast 8 digits", 400)
    }
    if (passwords.newpassword != passwords.confirmpassword) {
        throw new ExpressError("confirm password not match", 400)
    }
    const user = await UserModel.findById(_id)
    if (!user) {
        throw new ExpressError("User not found", 404)
    }
    user.changePassword(passwords.oldpassword, passwords.newpassword, function (err) {
        if (err) {
            throw new ExpressError("old password Not matches", 400)
        } else {
            res.status(200).json({ success: 'successfully change password' });
        }
    })
})



module.exports.setUserBlockStatus = WrapAsync(async (req, res, next) => {
    const { _id } = req.params
    const { isBlocked, message } = req.body
    let user = await UserModel.findById(_id)
    if (!user) {
        throw new ExpressError("User not found", 404)
    }
    if (user.role == "admin") {
        throw new ExpressError("you don't have permition to change the status of admin.", 400)
    }
    user = await UserModel.findByIdAndUpdate(_id, { isBlocked }, { runValidators: true, new: true })
    const options = await functionalities.setUserBlockStatusMail(user, adminMessage = message)
    const respounce = await sendMail(options)
    if (!respounce) {
        throw new ExpressError("Failed to Send Mail to User", 500)
    }
    const data = await UserModel.find({})
    res.status(200).json({
        success: true,
        data: data
    })
})



module.exports.authenticateUser = WrapAsync(async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (user.isBlocked) {
            next(new ExpressError("You are Blocked By Admin", 401));
        }
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new ExpressError(info.message, 401));
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);

            }
            return next();
        });
    })(req, res, next);

})


