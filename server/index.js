require('dotenv').config()
const path = require('path')
const cors = require('cors')
const express = require('express')
const router = require('./router/router')
const connect =require('./dbConenct')

connect(process.env.MONGO_URI)
const app = express()

const PORT = process.env.PORT

app.set("view engine","ejs")
app.set("views",path.resolve('./views'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/',router)

app.get(express.urlencoded({extended:false})) // helps to parse the form data

app.listen(PORT,() => console.log(`Server started at port:3000`))