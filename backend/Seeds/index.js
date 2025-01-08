const { clubs, events, gallery } = require("./helper")
const EventModel = require("../Models/eventModel")
const ClubModel = require("../Models/Clubs/clubsModel")
const ClubGalleryModel = require("../Models/Clubs/clubGalleryModel")
const mainGallery = require("../Models/galleryModel")
const connectDB = require("../config/mongoDB")
connectDB()
async function insertdata() {
    clubs.filter((item) => {
        item.description = item.description + "     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, eos? Eum libero incidunt consequuntur iure corporis voluptate iste dolores ea, rerum impedit expedita tempora, similique itaque inventore magni, nostrum quis?"
        return item
    })
    events.filter((item) => {
        item.description = item.description + "       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, eos? Eum libero incidunt consequuntur iure corporis voluptate inventore magni, nostrum quis?"
        return item
    })
    await ClubModel.deleteMany({})
    const clubsData = await ClubModel.insertMany(clubs)
    events.filter((item, inx) => {
        if (inx < 3) {
            item.conductedClub = [clubsData[0]._id, clubsData[1]._id, clubsData[2]._id]
        } else if (inx < 5) {
            item.conductedClub = [clubsData[0]._id, clubsData[1]._id]
        } else {
            item.conductedClub = [clubsData[0]._id, clubsData[1]._id, clubsData[2]._id, clubsData[3]._id, clubsData[4]._id]
        }
        return item
    })
    await EventModel.deleteMany({})
    const eventsData = await EventModel.insertMany(events)

    await ClubGalleryModel.deleteMany({})
    clubsData.map(async (item, inx) => {
        let data = []
        if (inx == 1) {
            data.push({ ...gallery[0], club: item._id })
        }
        if (inx < 3) {
            for (let i = 0; i < 3; i += 1) {
                data.push({ ...gallery[i], club: item._id })
            }

        } else {
            for (let i = 0; i < 5; i += 1) {
                data.push({ ...gallery[i], club: item._id })
            }
        }
        await ClubGalleryModel.insertMany(data)
    })
    await mainGallery.deleteMany({})
    await mainGallery.insertMany(gallery)
    console.log("completed")
}

insertdata()

