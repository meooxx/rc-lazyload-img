const rimraf = require('rimraf')

const asyncRimraf = (filepath) => {
  return new Promise((resolve, reject) => {
    rimraf(filepath, (err) => {
      if(err)  {
        reject(err)
        return
      }
      resolve()
    })
  })
}

exports.asyncRimraf = asyncRimraf