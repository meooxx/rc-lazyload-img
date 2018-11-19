const childProcess = require('child_process')
const defaultRegistry = 'https://registry.npmjs.org/'

// const pb = childProcess.spawn(
//   `npm`, ['login', `--registry=${defaultRegistry}`],  
//   { cwd: "./dist" }
// )

const logExec = (err, stdout) => {
  if(err) console.log(err)
  console.log(stdout)
}

childProcess.exec(
  `npm publish --registry=${defaultRegistry}`,
  { cwd: "./dist" }, 
  logExec
)