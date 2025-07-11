import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';
dotenv.config();

const port = process.env.PORT || 6000

connectDB()
.then(()=>{
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);        
    })
})
.catch((e) => {
    console.log("DB connection failed! ", e)
})

