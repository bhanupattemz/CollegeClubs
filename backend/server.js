const app = require("./app")
const connectDB = require("./config/mongoDB")
connectDB()
app.listen(8000, (err) => {
    if (!err) {
        console.log("server running on port 8000")
    } else {
        console.log(err)
    }
})