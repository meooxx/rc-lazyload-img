
const fse = require('fs-extra')
const path = require('path')
const process = require('process')

const rootDir = process.cwd()
const packageFile = 'package.json'
const readmeFile = "readme.md"

const packagePath = path.join(rootDir, packageFile)
const readmePath = path.join(rootDir, readmeFile)

const publisDir = "./dist/"

const generatePublishDir = () => {
  fse.copyFileSync(packagePath, publisDir + packageFile)
  fse.copyFileSync(readmePath, publisDir + readmeFile)
}


exports.generatePublishDir = generatePublishDir




