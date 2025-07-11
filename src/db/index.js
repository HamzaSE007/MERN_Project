import mongoose from 'mongoose'
import { DB_Name } from '../constant.js'

// mongo db link
// mongodb://atlas-sql-6865461332d41109ec831906-r6cisw.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
        
    } catch(e){
        console.error('Mongo DB connection Error: ', e)
        throw e
    }
}

export default connectDB