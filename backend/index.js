const express = require('express')
require('dotenv').config()
require('./database/connection')

const cors = require('cors')

const app = express()
const port = process.env.PORT

const UserRoute = require('./routes/userRoute')

app.use(express.json())
app.use(cors())

app.use(UserRoute)

app.listen(port, ()=>{
    console.log("App Started Succesfully");
})