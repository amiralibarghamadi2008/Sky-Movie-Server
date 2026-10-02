import "dotenv/config"
import express from "express"

// custom middleware's

import ConnectToDBMiddleware from "./middleware/ConnectToDB/connectToDB.js"
import GlobalLimiter from "./middleware/RateLimit/GlobalLimiter/globalLimiter.js"

// foreign middleware

import helmet from "helmet"
import cors from "cors"
import hpp from "hpp"
import cookieParser from "cookie-parser"

// api route's

import AuthRoute from "./routes/AuthRoute/route.js"
import SmsRoute from "./routes/SmsRoute/route.js"
import MovieRoute from "./routes/MovieRoute/route.js"
import SeriesRoute from "./routes/SeriesRoute/route.js"
import EpisodeRoute from "./routes/EpisodeRoute/route.js"
import ArticleRoute from "./routes/ArticleRoute/route.js"
import SliderRoute from "./routes/SliderRoute/route.js"

const app = express()

app.set('trust proxy', 1);

app.use(express.json())

app.use(ConnectToDBMiddleware)

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

// use api route's

app.get("/" , (req , res) => {
    res.status(200).json("به سرور sky movie خوش آمدید")
})

app.use("/api" , AuthRoute)

app.use("/api" , SmsRoute)

app.use("/api" , MovieRoute)

app.use("/api" , SeriesRoute)

app.use("/api" , EpisodeRoute)

app.use("/api" , ArticleRoute)

app.use("/api" , SliderRoute)

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