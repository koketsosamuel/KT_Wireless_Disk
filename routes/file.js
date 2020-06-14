const express = require("express")
const Router = express.Router()
const files = require("../controllers/file")
const multer = require("multer")
const fs =require("fs")

let storage = multer.diskStorage({
    destination:async function (req, file, cb) {
        let folder = String('store/'+req.body.dir)
        let exist = await fs.existsSync(folder)
        if(!exist) fs.mkdirSync(folder)
        cb(null, folder)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

// dir: string of the directory to upload to
Router.post("/upload", multer({storage}).array("files"), files.upload)

// dir: string of the current directory | newDir: name of the new folder
Router.post("/makefolder", files.folderMake)

// dir: directory to explore
Router.post("/explore", files.explore)


Router.post("/delete", files.deleteDir)
Router.post("/rename", files.rename)
Router.post("/copy", files.copy)
Router.post("/move", files.move)


module.exports = Router