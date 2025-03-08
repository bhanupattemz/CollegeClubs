const mongoose = require("mongoose")
require("dotenv").config()
const connectDB = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("connected mongoDB success")
        })
        .catch(err => {
            console.log(err)
            process.exit(1);
        })
}

module.exports = connectDB