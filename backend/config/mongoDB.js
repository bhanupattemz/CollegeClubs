
const mongoose = require("mongoose")

const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/SCAJNTUACEA")
        .then(() => {
            console.log("connected mongoDB success")
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = connectDB