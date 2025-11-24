const express = require('express')
const { loginUser, registerUser, makeToken } = require('../controllers/authController')
const authRouter = express.Router()




authRouter.post("/login", loginUser)
authRouter.post("/register", registerUser)
authRouter.get("/token", makeToken)


module.exports = {
    authRouter
}