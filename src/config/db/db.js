import mongoose from "mongoose";
import "dotenv/config"

export default async function ConnectToDB() {
    try{
        if (mongoose.connections[0].readyState) {
            return false
        }else{
            await mongoose
                .connect(`${process.env.MONGO_DB_PORT}`)
                .then(() => console.log("connect to db is successfuly 🔒"))
                .catch(console.log("can't connect to db ❌"))
        }
    }catch (err) {
        throw err
    }
}