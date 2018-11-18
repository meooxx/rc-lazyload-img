



const process = require("process")
const path = require("path")
const fs = require('fs')
const fse = require('fs-extra')


const dirPath = fs.realpathSync(process.cwd())
const imgsDir = path.relative(dirPath, 'build')
const rootDoc = path.resolve('..', "..", 'doc/')

const copyToDocFolder = () => {
  fse.copySync(imgsDir, rootDoc)
}


exports.copyToDocFolder = copyToDocFolder
