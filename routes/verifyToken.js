const jwt = require('jsonwebtoken');


//This is a custom middleware which will verify the access token and
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("Token is not valid");
            req.user = user
            next()
        })
    } else {
        return res.status(403).json("No Access")
        
    }
}

const verifyTokenAuthorization = (req,res,next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not allowed to modify")
        }
    })
}




module.exports = {verifyToken, verifyTokenAuthorization}