require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');

const userRoute = require('./routes/user')

const port = process.env.PORT
const mongoURl = process.env.MONGO_URL
mongoose.connect(mongoURl)
    .then(() => console.log('DB connection successful'))
    .catch((err) => console.log(err));



//Test Api - Router
app.use('/api/user', userRoute);





app.listen(port || 5000, () => {
    console.log(`Server is running on port ${port}`)
})