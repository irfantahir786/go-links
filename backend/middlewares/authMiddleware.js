const { verifyToken } = require("../utils/jwt")


const authMiddleware = (req, res, next) => {
    console.log('hello from middleware')
    //  const user = req.cookies.token
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token
    //  const token = user  // || req.cookies.token
    if (token) {
        console.log("Inside headers token")
        console.log("token", token)
        req.token = token
        const jsonPayload = verifyToken(token)
        req.userId = jsonPayload.id
        req.email = jsonPayload.email
        next()
    }
    else {
        return next.status(401).json({ status: "fail", message: "Invalid token" })
    }



}

module.exports = { authMiddleware }