import mongoose from "mongoose";

export const DB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        //                                            set color (library 'colors')
        console.log(`Mongo connected ${conn.connection.host}`.cyan.bgGreen)
    } catch (error) {
        console.log('Cannot connect to mongo DB ' + error)
        process.exit(1)

    }
}
