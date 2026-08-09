import "dotenv/config"
import express from "express"

const app = express()

const Port = process.env.LOCALE_PORT

app.listen(Port , (err) => {
    if (err) {
        throw err
    }else {
        console.log(`server run on port ${Port}`);
    }
})