//authentication route to verify users - register and login are two endpoints

const router = require('express').Router();
const User = require('../models/user')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken');

//Register Users
router.post('/register',async (req, res) => {
    //creating a new user instance
    const newUser = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        email: req.body.email,
    });

    try {
        //This will save user to database
        const savedUser = await newUser.save();
        // console.log(savedUser);
        res.status(201).json(savedUser)
    } catch (err) {
        // console.log(err)
        res.status(500).json(err)
    }
})


//Login User - check
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        //checks for user
        !user && res.status(401).json("Wrong Credentials")
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        //checks for password
        if (OriginalPassword !== req.body.password) {
            return res.status(401).json("Wrong Credentials");    
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin : user.isAdmin
        }, process.env.JWT_SEC,
            {expiresIn:"3d"}
        )
        const { password, ...others } = user._doc;

        res.status(200).json({...others,accessToken})
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router