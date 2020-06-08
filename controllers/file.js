const fs = require("fs-extra")
const config = require("../config")

module.exports = {

    upload: (req, res) => {

        res.json({})

    },

    folderMake: (req, res) => {

        fs.mkdir(config.rootDir+ "/" + req.body.dir+"/" + req.body.newDir, err => {
            if(err) res.json({error: true})
            res.json({})
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
            fs.remove(config.rootDir+"/"+dirs[i], err => {
                if(err) res.json({error: true})
            })
        }

        res.json({})

    },

    rename: (req, res) => {

        fs.rename(config.rootDir+"/"+req.body.dir, config.rootDir+"/"+req.body.newDir, err => {
            if(err) res.json({error: true})
            res.json({})
        })

    },

    explore: (req, res) => {

        let items = []
        let dirs = []

        let source = config.rootDir+"/"+req.body.dir

        fs.readdir(source, (err, files) => {

            try {

                if(err) {
                    res.json({error: true})
                    console.log(err)
                } else {
                    if(files == undefined) {
                        files = []
                    }
    
                    items = files
    
                    for(let i = 0; i < items.length; i++) {
    
                        let unit = source+"/"+items[i]
    
                        if(fs.statSync(unit).isDirectory()) {
                            dirs.push({type: "folder", name: items[i], dir: req.body.dir+"/"+items[i]})
                        } else {
                            dirs.push({type: "file", name: items[i], dir: req.body.dir+"/"+items[i]})
                        }
    
                    }
    
                    res.json({list: dirs})
                }

            } catch(err) {
                console.log(err)
                res.json({error: true})
            }

        })

    },

    copy: (req, res) => {

        fs.copy(config.rootDir + "/" + req.body.dir, config.rootDir + "/" + req.body.newDir+"/"+req.body.dir, err => {
            if(err) res.json({error: true})
            res.json({})
        })

    },

    move: (req, res) => {

        fs.move(config.rootDir + "/" + req.body.dir, config.rootDir + "/" + req.body.newDir+"/"+req.body.dir, err => {
            if(err) {
                console.error(err)
                res.json({error: true})
            }
            res.json({})
        })

    },


}