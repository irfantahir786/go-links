const express = require('express')
const cors = require('cors')
const { linksRouter } = require('./routes/linkRoutes')

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello")
})

app.use("/links", linksRouter)


app.listen(3001, () => {
    console.log("app started on 3001")
})

