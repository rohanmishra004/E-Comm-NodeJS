const router = require('express').Router();


//Test Code for router
router.get('/usertest', (req, res) => {
    res.send('User test successful')
})

router.post('/userpost', (req, res) => {
    const username = req.body.username;
    res.send(``)
})

module.exports = router