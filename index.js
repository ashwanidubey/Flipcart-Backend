const express = require('express')
require('dotenv').config()
const cors = require('cors');
const app = express()
const port = process.env.PORT
const connectToMongo = require('./db.js');

connectToMongo();
app.use(cors()); 
app.use(express.json())
app.use('/', require('./routers/Routers.js'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})