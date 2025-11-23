const express = require('express')
const cors = require('cors')
const { linksRouter } = require('./routes/linkRoutes')
const { dashboardRoutes } = require('./routes/dashboarRoutes')
const { userRouter } = require('./routes/userRoutes')
const { authRouter } = require('./routes/authRoutes')

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello")
})

app.use("/api/links", linksRouter)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)


app.listen(3001, () => {
    console.log("app started on 3001")
})

