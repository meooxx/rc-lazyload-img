

// const cp = require('child_process')
const fse = require('fs-extra')


const copyToPage = () => {
  fse.copySync("./example/demo1/build", './gh-pages')
}

module.exports = {
  copyToPage
}