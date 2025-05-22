const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connect to MongoDB successfully!"))
.catch((err) => console.error("Connect to MongoDB failed!", err))

app.get("/", (res, req) => {
    req.send("API running")
})

app.listen(port, () => {
    console.log(`App listen on PORT: ${port}`)
})