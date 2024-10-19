const Express = require("express")
const app = Express()

const UserRouters = require("./Routers/UserRouters")


app.use("/user", UserRouters)
module.exports = app