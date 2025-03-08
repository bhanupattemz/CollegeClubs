const WrapAsync = require("./Utils/WrapAsync")
const ExpressError = require("./Utils/ExpressError")

const { cloudinary } = require("./config/cloudinary");
const { events } = require("./Models/eventModel");
const { createPDF } = require("./Utils/CreateFile")
module.exports.deleteFromClodinary = WrapAsync(async (image) => {
    try {
        if (image && image.public_id !== "default") {
            await cloudinary.uploader.destroy(image.public_id);
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports.successFestEventRegistrationOptions = async (event, fest, user) => {
    let pdfBuffer = await createPDF(`<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; width: 100%; max-width: 600px; margin: 20px auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; background-color: #2c3e50; color: white; padding: 15px; border-radius: 8px;">
            <h2 style="font-size: 24px; margin: 0;">Event Receipt</h2>
            <p style="font-size: 16px;">For <strong>${user.name}</strong></p>
        </div>
        <div style="margin-top: 20px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">🎉 <strong>${event.name}</strong> - <strong>${fest.name}</strong></p>
            <p style="font-size: 16px; color: #555;">Event Date: <strong>${event.timings.starting}</strong></p>
            <p style="font-size: 16px; color: #555;">Event Location: <strong>${event.venue.venueName}, ${event.venue.landMark}</strong></p>
            <p style="font-size: 16px; color: #555;">Amount Paid: <strong>₹${event.amount}</strong></p>
            <p style="font-size: 16px; color: #555;">Registration Status: <strong>Success</strong></p>
            <p style="font-size: 16px; color: #555;">Transaction Id: <strong>${user.paymentInfo.paymentId}</strong></p>
        </div>
    
        <div style="margin-top: 20px; padding: 10px; background-color: #27ae60; color: white; text-align: center; border-radius: 5px;">
            <p style="font-size: 16px; margin: 0;">Your registration has been successfully confirmed!</p>
        </div>
    
        <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #777;">
            <p>Thank you for being part of <strong>${fest.name}</strong>!</p>
        </div>
    </div>
    `);
    return {
        mail: user.mail,
        subject: `Successful Registration for ${event.name} at ${fest.name}`,
        text: `Dear ${user.name},\n\nCongratulations! You have successfully registered for the event "${event.name}" at the ${fest.name}.\n\nDetails:\nEvent Date: ${event.date}\nLocation: ${event.location}\nAmount: ₹${event.registrationAmount}\n\nWe look forward to your participation. Good luck!\n\nBest regards,\nThe Event Organizing Team`,
        message: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; border-radius: 8px; color: #333;">
                <h2 style="font-size: 18px; color: #2c3e50; margin-bottom: 20px;">
                    🎉 Successful Registration for <strong>${event.name}</strong> at <strong>${fest.name}</strong>
                </h2>
                <p style="font-size: 16px; color: #444444; line-height: 1.6;">
                    Dear <strong>${user.name}</strong>,
                </p>
                <p style="font-size: 16px; color: #444444; line-height: 1.6;">
                    Congratulations! You have successfully registered for the event <strong>${event.name}</strong> at the <strong>${fest.name}</strong> fest. We are excited to have you participate in this event.
                </p>
                <p style="font-size: 16px; color: #444444; line-height: 1.6;">
                    <strong>Event Details:</strong><br>
                    <strong>Date:</strong> ${event.timings.starting}<br>
                    <strong>Location:</strong> ${event.venue.venueName}, ${event.venue.landMark}<br>
                    <strong>Amount Paid:</strong> ₹${event.amount}
                </p>
                <p style="font-size: 14px; color: #777777; margin-top: 20px; line-height: 1.6;">
                    We look forward to your participation in the event. Best of luck, and have a great time!
                </p>
                <p style="font-size: 14px; color: #777777; line-height: 1.6;">
                    Best regards,<br>
                    The Event Organizing Team
                </p>
            </div>
        `,
        attachments: [
            {
                filename: `${user._id}.pdf`,
                content: pdfBuffer,
                contentType: 'application/pdf'
            },
        ]
    };
}
module.exports.sendverifyCoordinatorMailOptions = async (user, club, _id) => {
    return {
        mail: user.mail,
        subject: `Coordinator Verification for ${club.name}`,
        text: `Dear ${user.personalInformation.firstname},\n\nCongratulations on being selected as a coordinator for ${club.name}!\n\nVerify your role here: ${process.env.FRONTEND_URL}/coordinator/verify/${_id}\n\nBest regards,\nThe Club Management Team`,
        message: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h2 style="color: #2c3e50;">Coordinator Verification for ${club.name}</h2>
                <p>Dear <strong>${user.personalInformation.firstname}</strong>,</p>
                <p>Congratulations on being selected as a coordinator for the <strong>${club.name}</strong>!</p>
                <p>Click the button below to verify your role:</p>
                <a href="${process.env.FRONTEND_URL}/coordinator/verify/${_id}" 
                   style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Verify Now
                </a>
                <p style="margin-top: 20px;">Best regards,<br>The Club Management Team</p>
            </div>
        `
    };
};

module.exports.adminGenerateMailOptions = async (mail, user, _id) => {
    return {
        mail: mail,
        subject: "College Clubs Mail Verification",
        text: `College Clubs Mail Verification\n\nYou have been referred by ${user.personalInformation.firstname} for the position of ${user.workedAs === "studentCoordinator" ? "Student Coordinator" : "Faculty Coordinator"}.\nPlease use the following link to create your account:\nhttp://localhost:8000/admin/signup/${_id}\n\nThis link will expire after 15 days. After verification, you will officially take on the role of ${user.workedAs === "studentCoordinator" ? "Student Coordinator" : "Faculty Coordinator"}.\n\nBest regards,\nThe College Clubs Team`,
        message: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px; color: #333;">
                <h2 style="color: #2c3e50;">College Clubs Mail Verification</h2>
                <p>You have been referred by <strong>${user.personalInformation.firstname} ${user.personalInformation.lastname}</strong> for the position of <strong>${user.workedAs === "studentCoordinator" ? "Student Coordinator" : "Faculty Coordinator"}</strong>.</p>
                <p>Please click the link below to complete your account setup:</p>
                <a href="${process.env.FRONTEND_URL}/admin/signup/${_id}" 
                   style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; text-align: center; display: inline-block;">
                   Create Account
                </a>
                <p style="margin-top: 20px;">This link will expire after <strong>24 hours</strong>. Once verified, you will officially serve as a <strong>${user.workedAs === "studentCoordinator" ? "Student Coordinator" : "Faculty Coordinator"}</strong>.</p>
                <p>Best regards,<br>The College Clubs Team</p>
            </div>
        `
    }
}


module.exports.setUserBlockStatusMail = async (user, adminMessage) => {
    return {
        mail: user.mail,
        subject: `Account ${user.isBlocked ? "Blocked" : "Unblocked"} Notification`,
        text: `Dear ${user.personalInformation.firstname},\n\nYour account has been ${user.isBlocked ? "blocked" : "unblocked"} by the admin.\n\nReason: ${adminMessage}\n\n${user.isBlocked ? "If you believe this is a mistake, please contact us." : "You now have full access to your account."}\n\nBest regards,\nCollege Clubs Team`,
        message: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffffff; border-radius: 8px; color: #333; border: 1px solid #ddd;">
                <h2 style="color: ${user.isBlocked ? "#d9534f" : "#5cb85c"}; text-align: center;">
                    Your Account Has Been ${user.isBlocked ? "Blocked ❌" : "Unblocked ✅"}
                </h2>
                <p style="font-size: 16px; color: #444; text-align: center;">
                    Dear <strong>${user.personalInformation.firstname} ${user.personalInformation.lastname}</strong>,
                </p>
                <p style="font-size: 16px; color: #444; text-align: center;">
                    ${user.isBlocked ? "Unfortunately, your account has been blocked due to the following reason:" : "Good news! Your account has been unblocked, and you now have full access."}
                </p>
                <blockquote style="font-style: italic; font-size: 14px; color: #555; background: #f8f8f8; padding: 10px; border-left: 4px solid #d9534f; margin: 20px 10px;">
                    ${adminMessage}
                </blockquote>
                ${user.isBlocked ? `
                    <p style="text-align: center;">
                        If you believe this action was taken in error, please contact our support team.
                    </p>
                    <div style="text-align: center; margin-top: 15px;">
                        <a href="${process.env.FRONTEND_URL}/contact" 
                           style="background-color: #d9534f; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                           Contact Support
                        </a>
                    </div>
                ` : ""}
                <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
                    Best regards,<br>
                    <strong>College Clubs Team</strong>
                </p>
            </div>
        `
    }
}



module.exports.adminDeleteUserOptions = async (user, adminMessage) => {
    return {
        mail: user.mail,
        subject: "Account Deletion Notification",
        text: `Dear ${user.personalInformation.firstname},\n\nYour account has been deleted by the admin.\n\nReason: ${adminMessage}\n\nPlease note that your account and all associated data are permanently deleted and cannot be recovered.\n\nBest regards,\nCollege Clubs Team`,
        message: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffffff; border-radius: 8px; color: #333; border: 1px solid #ddd;">
                <h2 style="color: #d9534f; text-align: center;">Account Deletion Notification</h2>
                <p style="font-size: 16px; color: #444; text-align: center;">
                    Dear <strong>${user.personalInformation.firstname} ${user.personalInformation.lastname}</strong>,
                </p>
                <p style="font-size: 16px; color: #444; text-align: center;">
                    We regret to inform you that your account has been deleted by the admin due to the following reason:
                </p>
                <blockquote style="font-style: italic; font-size: 14px; color: #555; background: #f8f8f8; padding: 10px; border-left: 4px solid #d9534f; margin: 20px 10px;">
                    ${adminMessage}
                </blockquote>
                <p style="font-size: 16px; color: #444; text-align: center;">
                    Please note that once deleted, your account and all associated data are permanently removed and cannot be recovered.
                </p>
                <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
                    Best regards,<br>
                    <strong>College Clubs Team</strong>
                </p>
            </div>
        `
    }
}
