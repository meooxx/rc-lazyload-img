const rimraf = rquire('rimraf')

export const asyncRimraf = (filepath) => {
  return new Promose((resolve, reject) => {
    rimraf(filepath, (err) => {
      if(err)  {
        reject(err)
        return
      }
      resolve()
    })
  })
}