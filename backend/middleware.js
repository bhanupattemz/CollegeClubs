const WrapAsync = require("./Utils/WrapAsync")
const ExpressError = require("./Utils/ExpressError")

module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.isBlocked) {
            next(new ExpressError("You are Blocked By Admin", 401))
        }
        return next()
    }
    next(new ExpressError("must logged in", 401))
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role == "admin") {
        return next()
    }
    next(new ExpressError("Restricted page only admin will allowed", 401))
}

module.exports.isCoordinator = (req, res, next) => {
    if (req.isAuthenticated() && (req.user.role === "coordinator")) {
        return next()
    }
    next(new ExpressError("Restricted page only admin will allowed", 401))
}

module.exports.isOrganizers = (req, res, next) => {
    if (req.isAuthenticated() && (req.user.role === "coordinator" || req.user.role === "admin")) {
        return next()
    }
    next(new ExpressError("Restricted page only admin will allowed", 401))
}

