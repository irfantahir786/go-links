const express = require('express')
const { dashboardData } = require('../controllers/dashboardController')
const dashboardRoutes = express.Router()
const { authMiddleware } = require('../middlewares/authMiddleware')




dashboardRoutes.get("/", authMiddleware, dashboardData)

module.exports = {
    dashboardRoutes
}