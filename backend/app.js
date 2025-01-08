const Express = require("express")
const app = Express()
const ExpressError = require('./Utils/ExpressError')
require('dotenv').config()
const cors = require("cors")

//passport && session requirements
const UserModel = require("./Models/Users/UserModel")
const passPort = require("passport")
const passPortLocal = require("passport-local")
const Session = require("express-session")
const MongoStore = require("connect-mongo")
const path = require("path")

//router requirements
const UserRouter = require("./Routers/UserRouter")
const EventRouter = require("./Routers/EventRouter")
const AnnouncementRouter = require('./Routers/AnnouncementRouter')
const DonarRouter = require("./Routers/DonationRouter")
const ClubRouter = require("./Routers/ClubRouter")
const GalleryRouter = require("./Routers/GalleryRouter")
const LetterRouter = require("./Routers/LettersRouter")
const PastMemberRouter = require("./Routers/PastUserRouter")
const CarouselRouter = require("./Routers/CarouselRouter")
const FestRouter = require("./Routers/FestRouter")
const EnvRouter = require("./Routers/EnvRouter")
const AdministrationRouter = require("./Routers/AdministrationRouter")
const LibraryRouter = require("./Routers/LibraryRouter")
const CertificatesRouter = require("./Routers/CertificateRouter")
const ContactRouter = require("./Routers/ContactRouter")
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
}));

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))


const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.STORE_SECRET
    }
});
const sessionConfig = {
    store,
    name: 'session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(Session(sessionConfig))
app.use(passPort.initialize());
app.use(passPort.session())
passPort.use(new passPortLocal(UserModel.authenticate()));
passPort.serializeUser(UserModel.serializeUser())
passPort.deserializeUser(UserModel.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use("/api/v1", UserRouter)
app.use("/api/v1/events", EventRouter)
app.use("/api/v1/announcements", AnnouncementRouter)
app.use("/api/v1/donars", DonarRouter)
app.use("/api/v1/clubs", ClubRouter)
app.use("/api/v1/gallery", GalleryRouter)
app.use("/api/v1/letters", LetterRouter)
app.use("/api/v1/past_members", PastMemberRouter)
app.use("/api/v1/carousel", CarouselRouter)
app.use("/api/v1/fest", FestRouter)
app.use("/api/v1/administration", AdministrationRouter)
app.use("/api/v1/library", LibraryRouter)
app.use("/api/v1/certificates", CertificatesRouter)
app.use("/api/v1/contact", ContactRouter)
app.use("/api/v1", EnvRouter)

app.use("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    console.log(err)
    if (!err.message) err.message = "some thing wents Wrong";
    res.status(statusCode).json({
        statusCode: err.statusCode,
        message: err.message
    })
})

module.exports = app