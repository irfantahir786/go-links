const express = require('express')
const { checkLinkAvailability,
    createLink, viewLink, updateClick,
    updateData, dashboardData } = require('../controllers/linksController')
const linksRouter = express.Router()




linksRouter.get("/view/:code", viewLink)
linksRouter.post("/updateClick/:code", updateClick)
linksRouter.post("/", createLink)
linksRouter.patch("/:code", updateData)
linksRouter.get("/check/:code", checkLinkAvailability)
linksRouter.get("/dashboard", dashboardData)

module.exports = {
    linksRouter
}