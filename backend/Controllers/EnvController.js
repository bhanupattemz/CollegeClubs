const ExpressError = require("../Utils/ExpressError")
const WrapAsync = require("../Utils/WrapAsync")
const axios = require("axios")
const UserModel = require("../Models/Users/UserModel")
const ClubsModel = require("../Models/Clubs/clubsModel")
const EventModel = require("../Models/eventModel")
const DonationsModel = require("../Models/donationModel")
const User = require("../Models/Users/UserModel")
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

module.exports.getAdminNumbers = WrapAsync(async (req, res) => {
    const clubs = await ClubsModel.find()
    const members = await UserModel.find()
    const events = await EventModel.find()
    const donations = await DonationsModel.find()
    let amount = 0;
    donations.forEach((item) => {
        amount += item.amount
    })
    res.json({
        success: true,
        data: [clubs.length, amount, members.length, events.length]
    });
})

module.exports.getAdminMemberData = WrapAsync(async (req, res) => {
    const general = await UserModel.find({ role: "general" })
    const student = await UserModel.find({ role: "student" })
    const coordinator = await UserModel.find({ role: "coordinator" })
    const admin = await UserModel.find({ role: "admin" })
    res.json({
        success: true,
        data: [general.length, student.length, coordinator.length, admin.length]
    });
})

module.exports.adminGetclubsEvents = WrapAsync(async (req, res) => {
    let data = []
    const clubs = await ClubsModel.find()
    for (const item of clubs) {
        const events = await EventModel.find({ conductedClub: item._id })
        data.push({ name: item.name, count: events.length })
    }
    res.json({
        success: true,
        data: data
    });
})

module.exports.adminGetDonations = WrapAsync(async (req, res) => {
    const data = [];
    const labels = [];
    const amounts = [];
    for (let i = 0; i < 6; i++) {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - i);
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);
        endDate.setHours(23, 59, 59, 999);

        const donations = await DonationsModel.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        });
        const amount = donations.reduce((sum, item) => sum + item.amount, 0);
        const monthName = startDate.toLocaleString('en-US', { month: 'short' });
        labels.push(monthName)
        data.push(donations.length);
        amounts.push(amount)
    }
    res.json({
        success: true,
        data: {
            data: data.reverse(),
            amounts: amounts.reverse(),
            labels: labels.reverse()
        }
    });
})


// coordinator 

module.exports.getCoordinatorNumbers = WrapAsync(async (req, res) => {
    const clubs = await ClubsModel.find({ "coordinators.details": req.user._id })
    let userClubs = []
    let clubMembers = new Set()
    for (let club of clubs) {
        userClubs.push(club._id)
        club.members.forEach((member) => clubMembers.add(member))
    }
    const events = await EventModel.find({ conductedClub: { $in: userClubs } })
    const donations = await DonationsModel.find({ club: { $in: userClubs } })
    let amount = 0;
    donations.forEach((item) => {
        amount += item.amount
    })
    res.json({
        success: true,
        data: [clubs.length, amount, clubMembers.size, events.length]
    });
})



module.exports.getCoordinatorDonations = WrapAsync(async (req, res) => {
    const clubs = await ClubsModel.find({ "coordinators.details": req.user._id })
    const data = [];
    const labels = [];
    const amounts = [];
    for (let club of clubs) {
        labels.push(club.name)
        const donations = await DonationsModel.find({ club: club._id })
        data.push(donations.length)
        let amount = 0;
        donations.forEach((donation) => amount += donation.amount)
        amounts.push(amount)
    }
    res.json({
        success: true,
        data: {
            data: data.reverse(),
            amounts: amounts.reverse(),
            labels: labels.reverse()
        }
    });
})


module.exports.getCoordinatorTopDonations = WrapAsync(async (req, res) => {
    const clubs = await ClubsModel.find({ "coordinators.details": req.user._id })
    const userClubs = clubs.map((club) => club._id)
    const donations = await DonationsModel.find({ club: { $in: userClubs } }).select("name amount createdAt club").populate({ path: "club", select: "name" }).sort({ "createdAt": -1 }).limit(10);
    res.json({
        success: true,
        data: donations
    });
})


module.exports.getCoordinatorMemberData = WrapAsync(async (req, res) => {
    const clubs = await ClubsModel.find({ "coordinators.details": req.user._id })
    const data = [];
    const labels = [];
    for (let club of clubs) {
        labels.push(club.name)
        data.push(club.members.length)
    }
    res.json({
        success: true,
        data: {
            data: data,
            labels: labels
        }
    });
})

module.exports.getCoordinatorMemberData = WrapAsync(async (req, res) => {
    const clubs = await ClubsModel.find({ "coordinators.details": req.user._id })
    const data = [];
    const labels = [];
    for (let club of clubs) {
        labels.push(club.name)
        data.push(club.members.length)
    }
    res.json({
        success: true,
        data: {
            data: data,
            labels: labels
        }
    });
})

module.exports.coordinatorGetclubsEvents = WrapAsync(async (req, res) => {
    let data = []
    const clubs = await ClubsModel.find({ "coordinators.details": req.user._id })
    for (const item of clubs) {
        const events = await EventModel.find({ conductedClub: item._id })
        data.push({ name: item.name, count: events.length })
    }
    res.json({
        success: true,
        data: data
    });
})