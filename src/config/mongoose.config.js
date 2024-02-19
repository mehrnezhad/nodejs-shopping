import mongoose from "mongoose";
import { config } from "dotenv";
config()
const mongooseConfig = async () => {
    mongoose.set('strictQuery', true)
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Mongoose connected!...')
    } catch (error) {
        console.log(error?.message ?? 'failed to connect database...')
    }

    process.on('SIGINT', async () => {
        await mongoose.connection.close()
        process.exit(0)
    })

}

export default mongooseConfig