const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY)
    return token
}

const verifyToken = (token) => {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
    return user
}


module.exports = {
    generateToken, verifyToken
} 