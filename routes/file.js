const express = require("express")
const Router = express.Router()
const files = require("../controllers/file")
const multer = require("multer")
const fs =require("fs")

let storage = multer.diskStorage({
    destination:async function (req, file, cb) {
        let folder = String('store/'+req.body.folder)
        let exist = await fs.existsSync(folder)
        if(!exist) fs.mkdirSync(folder)
        cb(null, folder)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

Router.post("/upload", multer({storage}).array("files"), files.upload)
Router.post("/makefolder", files.folderMake)
Router.post("/explore", files.explore)
Router.post("/delete", files.deleteFiles)
Router.post("/rename", files.rename)

module.exports = Router