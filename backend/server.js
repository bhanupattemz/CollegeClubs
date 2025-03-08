const app = require("./app")
require('dotenv').config()
const connectDB = require("./config/mongoDB")
connectDB()
app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log(`server running on port ${process.env.PORT}`)
    } else {
        console.log(err)
    }
})