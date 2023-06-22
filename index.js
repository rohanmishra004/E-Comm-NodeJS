require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');

const port = process.env.PORT
const mongoURl = process.env.MONGO_URL
mongoose.connect(mongoURl)
    .then(() => console.log('DB connection successful'))
    .catch((err) => console.log(err));



//Test Api
app.get('/test', (req, res) => {
    res.send('Test is successful')
})


app.listen(port || 5000, () => {
    console.log(`Server is running on port ${port}`)
})