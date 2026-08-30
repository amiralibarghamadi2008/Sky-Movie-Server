// file and middleware
import "dotenv/config"
import express from "express"
import ConnectToDBMiddleware from "./middleware/ConnectToDB/connectToDB.js"
import GlobalLimiter from "./middleware/RateLimit/GlobalLimiter/globalLimiter.js"
import SmsRoutes from "./routes/SmsRoute/route.js"
import SignIn from "./routes/AuthRoute/route.js"
import helmet from "helmet"
import cors from "cors"

// confing and middleware
const app = express()

app.use(express.json())

app.set('trust proxy', 1);

app.use(ConnectToDBMiddleware())

app.use(GlobalLimiter)

app.use(cookieParser())

app.use(helmet())

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(hpp());



// route's
app.use("/api" , SmsRoutes)
app.use("/api" , SignIn)

app.use(( req , res ) => {
    res.status(404).json({
        success:false,
        message : "متسفانه مسیر مورد نظر وجود ندارد",
        pathe : req.originalUrl
    })
})

// run server
const Port = process.env.LOCALE_PORT

app.listen(Port , (err) => {
    if (err) {
        throw err
    }else {
        console.log(`server run on port ${Port}`);
    }
})