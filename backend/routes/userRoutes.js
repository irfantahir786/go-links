const express = require('express')
const { profile } = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddleware')
const userRouter = express.Router()




userRouter.get("/profile", authMiddleware, profile)


module.exports = {
    userRouter
}