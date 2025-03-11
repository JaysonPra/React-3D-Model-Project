const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
require('./database/connection')

const cors = require('cors')

const app = express()
const port = process.env.PORT

const testRoute = require('./routes/testRoutes')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(testRoute)
app.use(categoryRoute)
app.use(productRoute)
app.use(userRoute)

app.use('/public/uploads',express.static('public/uploads'))

// app.get('/hi', (request,response)=>{
//     response.send("Hello!!!")
// })

app.listen(port, ()=> {
    console.log("App started successfully.")
})