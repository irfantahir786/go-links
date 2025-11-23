const express = require('express')
const { dashboardData } = require('../controllers/dashboardController')
const dashboardRoutes = express.Router()




dashboardRoutes.get("/", dashboardData)

module.exports = {
    dashboardRoutes
}