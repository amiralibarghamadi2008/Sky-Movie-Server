// file and middleware
import "dotenv/config"
import express from "express"
import SmsRoutes from "./routes/SmsRoute/route.js"
import SignIn from "./routes/AuthRoute/route.js"

// confing and middleware
const app = express()
app.use(express.json())

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