const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const axios = require("axios")
const UserModel = require("../Models/Users/UserModel")
const ClubsModel = require("../Models/Clubs/clubsModel")
const EventModel = require("../Models/eventModel")

module.exports.latestYoutubeVideo = WrapAsync(async (req, res) => {
    try {
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=UCQWn-DoFCowb6LDxGzOUTFQ&part=snippet&order=date`
        );
        res.json({
            success: true,
            data: response.data.items[0]
        });
    } catch (error) {
        next(new ExpressError("Failed to fetch videos", 500))
    }
})

module.exports.getMapApiKey = WrapAsync(async (req, res) => {
    res.json({
        success: true,
        data: process.env.MAP_API_KEY
    });
})


module.exports.getReCapchaApiKey = WrapAsync(async (req, res) => {
    res.json({
        success: true,
        data: process.env.RE_CAPTCHA_KEY
    });
})

module.exports.getRazorPayKey = WrapAsync(async (req, res) => {
    res.json({
        success: true,
        data: process.env.RAZORPAY_KEY_ID
    });
})

module.exports.getscajntuaByNumbers = WrapAsync(async (req, res) => {
    const clubs = await ClubsModel.find()
    const coordinators = await UserModel.find(({ role: "coordinator" }))
    const members = await UserModel.find()
    const events = await EventModel.find()
    res.json({
        success: true,
        data: [clubs.length, members.length, coordinators.length, events.length]
    });
})