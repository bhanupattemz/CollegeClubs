const mongoose = require("mongoose")
require("dotenv").config()
const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/SCAJNTUACEA")
        .then(() => {
            console.log("connected mongoDB success")
        })
        .catch(err => {
            console.log(err)
            process.exit(1);
        })
}

module.exports = connectDB