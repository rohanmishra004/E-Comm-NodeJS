require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');

//Routes Imports
const userRoute = require('./routes/user')
const authRoute = require('./routes/authentication')



const port = process.env.PORT
const mongoURl = process.env.MONGO_URL
mongoose.connect(mongoURl)
    .then(() => console.log('DB connection successful'))
    .catch((err) => console.log(err));



//MiddleWare 
app.use(express.urlencoded({extended:false}))
app.use(express.json())



app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);





app.listen(port || 5000, () => {
    console.log(`Server is running on port ${port}`)
})