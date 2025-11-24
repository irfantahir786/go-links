const express = require('express')
const cors = require('cors')
const { linksRouter } = require('./routes/linkRoutes')
const { dashboardRoutes } = require('./routes/dashboarRoutes')
const { userRouter } = require('./routes/userRoutes')
const { authRouter } = require('./routes/authRoutes')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const { verifyToken } = require('./utils/jwt')

dotenv.config()
const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("hello")
})

app.use("/api/links", linksRouter)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)


const verify = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZW1haWxAZ21haWwuY29tIiwiaWF0IjoxNzYzOTYzOTgwfQ.9NyZqVTuTfjUTk0bgiM9MdVBMzk1T4UaRVVIx5mBbHY")
console.log(verify)





app.listen(3001, () => {
    console.log("app started on 3001")
})

