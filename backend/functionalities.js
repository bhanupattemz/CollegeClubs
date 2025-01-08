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
            <h2 style="font-size: 24px; margin: 0;">Event Ticket</h2>
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
