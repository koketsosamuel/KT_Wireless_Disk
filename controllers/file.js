const fs = require("fs-extra")
const config = require("../config")

module.exports = {

    upload: (req, res) => {

        res.sendStatus(200)

    },

    folderMake: (req, res) => {

        fs.mkdir(config.rootFolder+ "/" + req.body.folder, err => {
            if(err) res.sendStatus(500)
            res.sendStatus(200)
        })

    },

    deleteFiles: (req, res) => {

        let files = [...req.body.files]

        for(let i = 0; i < files.length; i++) {
            fs.remove(config.rootFolder+"/"+files[i], err => {
                if(err) res.sendStatus(500)
            })
        }

        res.sendStatus(200)

    },

    rename: (req, res) => {

        fs.rename(config.rootFolder+"/"+req.body.folder, config.rootFolder+"/"+req.body.newFolder, err => {
            if(err) res.sendStatus(500)
            res.sendStatus(200)
        })

    },

    explore: (req, res) => {

        let items = []
        let dirs = []

        let source = config.rootFolder+"/"+req.body.folder

        fs.readdir(source, (err, files) => {

            if(err) res.sendStatus(500)

            items = [...files]

            for(let i = 0; i < items.length; i++) {

                let unit = source+"/"+items[i]

                if(fs.statSync(unit).isDirectory()) {
                    dirs.push({type: "folder", dir: req.body.folder+"/"+items[i]})
                } else {
                    dirs.push({type: "file", dir: req.body.folder+"/"+items[i]})
                }

            }

            res.json({list: dirs})

        })

    },



}