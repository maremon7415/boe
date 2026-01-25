import mongoose, { Mongoose } from "mongoose"

const dbUrl = process.env.MONGODB_URI as string

if (!dbUrl) {
    throw new Error("Please provide MONGODB_URI in the environment variables")
}
type MongooseCache ={
    conn: Mongoose | null,
    promise: Promise<Mongoose> | null
}
declare global {
    var mongoose: MongooseCache |undefined
}
const cached: MongooseCache = global.mongoose || {
    conn: null,
    promise: null
}

global.mongoose = cached

export default async function connectDb() {
    try {
        if (cached.conn) {
            return cached.conn
        }
        if (!cached.promise) {
            cached.promise = mongoose.connect(dbUrl, {
                bufferCommands: false
            }).then((mongoose) => {
                console.log("Database connected")
                return mongoose
            })
        }
        cached.conn = await cached.promise
    } catch (error) {
        console.log("Database connection error", error)
        process.exit(1)
    }
}