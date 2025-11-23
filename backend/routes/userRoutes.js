const express = require('express')
const { allUser } = require('../controllers/userController')
const userRouter = express.Router()




userRouter.get("/", allUser)


module.exports = {
    userRouter
}