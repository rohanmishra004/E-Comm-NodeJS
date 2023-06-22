require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');

const port = process.env.PORT
const mongoURl = process.env.MONGO_URL
mongoose.connect(mongoURl)
    .then(() => console.log('DB connection successful'))
    .catch((err) => console.log(err));




app.listen(process.env.port, () => {
    console.log(`Server is running on port ${port}`)
})