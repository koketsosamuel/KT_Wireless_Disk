const fs = require("fs-extra")
const config = require("../config")

module.exports = {

    upload: (req, res) => {

        res.json({})

    },

    folderMake: (req, res) => {

        fs.mkdir(config.rootDir+ "/" + req.body.dir+"/" + req.body.newDir, err => {
            if(err) {
                res.json({error: true})
            } else {
                res.json({})
            }
        })

    },

    /**
     * delete directories
     * @param req Object
     * route: /file/delete
     * input: dir{String}
     * res: fail{400} success{200}
     */
    deleteDir: (req, res) => {

        let dirs = req.body.dir

        fs.remove(config.rootDir+"/"+dirs, err => {
            if(err) res.json({error: true})
        })        

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
    
                        if(!fs.statSync(unit).isFile()) {
                            dirs = [...dirs, `{"name": "${items[i]}", "dir": "${req.body.dir+"/"+items[i]}", "folder":true}`]
                        } else {
                            dirs = [...dirs, `{"name": "${items[i]}", "dir": "${req.body.dir+"/"+items[i]}", "folder":false}`]
                        }
    
                    }
    
                    res.json({dirs: dirs})
                    
                }

            } catch(err) {
                console.error(err)
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