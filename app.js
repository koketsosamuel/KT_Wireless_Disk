const express = require("express")
const cors = require("cors")
// const bp = require("body-parser")
const fs = require("fs")
const app = express()
const files = require("./routes/file")

fs.exists("./store", async e => {
    if(!e) {
        await fs.mkdirSync("./store")
        fs.mkdirSync("./store/videos")     
        fs.mkdirSync("./store/music")
        fs.mkdirSync("./store/documents")
        fs.mkdirSync("./store/pictures")
    }
})

console.log(fs.readdirSync("."))


app.use(cors())
//app.use(bp.json())

app.use("/files", files)

app.listen(8000)