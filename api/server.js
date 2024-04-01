const express = require('express')
const colors = require('colors')
const config = require('./db/config')
const cors = require('cors')
const dotenv = require('dotenv')
const logger = require('morgan')
const mainRoute = require('./routers/index')
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000


  
  // middleware
app.use(logger('dev'))
app.use(express.json())
app.use(cors())




// Routes
app.use('/api', mainRoute)


app.listen(PORT, () => {
    config()
    console.log(`Server is running on port ${PORT}.`.bgYellow.blue)
} )