const router = require('express').Router();
const User = require('../models/user')
const {verifyToken,verifyTokenAuthorization} = require('./verifyToken');



router.put('/:id',verifyTokenAuthorization, async(req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.PASS_SECRET
        ).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true });
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router