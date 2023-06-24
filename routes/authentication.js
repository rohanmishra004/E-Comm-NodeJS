//authentication route to verify users - register and login are two endpoints

const router = require('express').Router();
const User = require('../models/user')
const CryptoJS = require('crypto-js')


//Register Users
router.post('/register',async (req, res) => {
    //creating a new user instance
    const newUser = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        email: req.body.email,
    });

    //This will save user to database
    try {
        const savedUser = await newUser.save();
        // console.log(savedUser);
        res.status(200).json(savedUser)
    } catch (err) {
        // console.log(err)
        res.status(500).json(err)
    }
})


//Login User - check
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json("Wrong Credentials")
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)
        const password = hashedPassword.toString(CryptoJS.enc.Utf8)

        password !== req.body.password && res.status(401).json("Wrong Credentials")


        res.status(200).json(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router