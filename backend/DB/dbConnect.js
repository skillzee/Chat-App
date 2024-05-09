import mongoose from "mongoose";


const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: "CHAT-APP"
        })
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.log("Error in connecting MOnGoDD");
        
    }

}

export default dbConnect