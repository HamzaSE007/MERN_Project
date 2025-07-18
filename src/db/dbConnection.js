import mongoose from 'mongoose'
import { DB_Name } from '../constant.js'

// mongo db link
// mongodb://atlas-sql-6865461332d41109ec831906-r6cisw.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin

const connectDB = async ()=>{
   try {
    console.log("Attempting to connect with MONGO_URI:", process.env.MONGO_URI);
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export default connectDB