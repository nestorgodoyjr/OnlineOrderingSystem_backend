import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/OnlineOrderingSystem'

export const db = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Database Connected Successfully!')
    } catch (error) {
        console.error("Error Connecting Database")
    }
}