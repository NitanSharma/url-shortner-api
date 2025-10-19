import express from "express";
import {nanoid} from "nanoid"// package to generate random id
import dotenv from "dotenv"
import connectDB from "./src/config/monogo.config.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"

dotenv.config("./.env")

const app = express();// start express

app.use(cors({
    origin: 'http://localhost:5173', // your React app
    credentials: true // 👈 this allows cookies to be sent
}));// this is to allow cross origin requests 

app.use(express.json())// this is to parse json data
app.use(express.urlencoded({extended:true}))// this is to parse url encoded data
app.use(cookieParser())// this is to parse cookies

app.use(attachUser)// this is to attach user to req object

app.use("/api/user",user_routes) // user routes
app.use("/api/auth",auth_routes)// auth routes
app.use("/api/create",short_url)// short url routes
app.get("/:id",redirectFromShortUrl)
app.get('/', (req,res) =>{
    res.send("Server is runing");
})
app.use(errorHandler) // error handler

app.listen(3000,()=>{
    connectDB()
    console.log("Server is running on http://localhost:3000");
})

// GET - Redirection 
