const fs = require("fs-extra")
const config = require("../config")

module.exports = {

    upload: (req, res) => {

        res.sendStatus(200)

    },

    folderMake: (req, res) => {

        fs.mkdir(config.rootFolder+ "/" + req.body.dir+"/" + req.body.newDir, err => {
            if(err) res.sendStatus(500)
            res.sendStatus(200)
        })

    },

    /**
     * delete directories
     * @param req Object
     * route: /file/delete
     * input: dir{String}
     * res: fail{400} success{200}
     */
    deleteDirs: (req, res) => {

        console.log(req.body)

        let dirs = [...req.body.dirs]

        for(let i = 0; i < dirs.length; i++) {
            fs.remove(config.rootFolder+"/"+dirs[i], err => {
                if(err) res.sendStatus(500)
            })
        }

        res.sendStatus(200)

    },

    rename: (req, res) => {

        fs.rename(config.rootFolder+"/"+req.body.dir, config.rootFolder+"/"+req.body.newDir, err => {
            if(err) sendStatus(400)
            res.sendStatus(200)
        })

    },

    explore: (req, res) => {

        let items = []
        let dirs = []

        let source = config.rootFolder+"/"+req.body.dir

        fs.readdir(source, (err, files) => {

            if(err) res.sendStatus(500)

            items = [...files]

            for(let i = 0; i < items.length; i++) {

                let unit = source+"/"+items[i]

                if(fs.statSync(unit).isDirectory()) {
                    dirs.push({type: "folder", dir: req.body.dir+"/"+items[i]})
                } else {
                    dirs.push({type: "file", dir: req.body.dir+"/"+items[i]})
                }

            }

            res.json({list: dirs})

        })

    },

    copy: (req, res) => {

        fs.copy(config.rootDir + "/" + req.body.dir, config.rootDir + "/" + req.body.newDir+"/"+req.body.dir, err => {
            if(err) res.sendStatus(400)
            res.sendStatus(200)
        })

    },

    move: (req, res) => {

        fs.move(config.rootDir + "/" + req.body.dir, config.rootDir + "/" + req.body.newDir+"/"+req.body.dir, err => {
            if(err) {
                console.error(err)
                res.sendStatus(400)
            }
            res.sendStatus(200)
        })

    },


}