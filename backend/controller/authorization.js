const jwt = require("jsonwebtoken")

exports.isLoggedIn = (req, res) => {
    if(!req.headers.authorization){
        return res.status(401).json({error: "You must sign in to access this resource"})
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    let user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

    if(!user.isAdmin){
        return res.status(400).json({error: "You must be Admin to access this resource"})
    } next();
}