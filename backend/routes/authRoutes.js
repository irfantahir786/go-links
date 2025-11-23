const express = require('express')
const { loginUser } = require('../controllers/authController')
const authRouter = express.Router()




authRouter.get("/login", loginUser)
// authRouter.post("/updateClick/:code", updateClick)
// authRouter.post("/", createLink)
// authRouter.patch("/:code", updateData)
// authRouter.get("/check/:code", checkLinkAvailability)
// authRouter.get("/dashboard", dashboardData)

module.exports = {
    authRouter
}