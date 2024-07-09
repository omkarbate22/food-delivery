import express from "express"
import cors from "cors"
import {connectDB} from './config/db.js'

import foodRouter from "./routes/foodRoute.js"

//config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())



//db connection
connectDB();

// api endpoints
app.use("/api/food" , foodRouter );

//api end

app.get('/' , (req ,res)=> {

    res.send("API working")

})

app.listen(port, ()=>{

    console.log(`Server Started pn http://localhost:${port}`)
})


//mongodb+srv://omkarbate78:Omkar2207@cluster0.goffczb.mongodb.net/?