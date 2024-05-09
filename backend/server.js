
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"


import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"


import dbConnect from "./DB/dbConnect.js";

const app = express();
const PORT = process.env.PORT || 5000

dotenv.config()

app.use(cors())
app.use(express.json()) 
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)


app.get("/", (req,res)=>{
    res.send("This is the Home Page")
})





app.listen(PORT, ()=>{
    dbConnect()
    console.log(`Server running on ${PORT}`);
})