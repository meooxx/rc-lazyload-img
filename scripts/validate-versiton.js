const cp = require('child_process')
const semver = require('semver')
const chalk = require('chalk')

const validVersion = (packageVersion) => {

  const remoteVersion = cp.execSync('npm view rc-lazyload-img version', {
    encoding: "utf-8"
  })
  
  if(!semver.valid(packageVersion)) {
    throw Error('Invalid version sepecified')
  }
  
  if(!semver.gt(packageVersion, remoteVersion)) {
    throw Error(
      chalk.red('Version' , packageVersion, "has been published")
    )
  }
}


module.exports = validVersion