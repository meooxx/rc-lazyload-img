const childProcess = require('child_process')
const defaultRegistry = 'https://registry.npmjs.org/'

// const pb = childProcess.spawn(
//   `npm`, ['login', `--registry=${defaultRegistry}`],  
//   { cwd: "./dist" }
// )

const logExec = (err, stdout) => {
  if(err) {
    console.log(err)
    throw err
  }
  console.log(stdout)
}


async function execCommand() {
try {
  await childProcess.exec(
    `ls -alt .`,
    
    logExec
  )
  await childProcess.exec(
    `npm whoami --registry=${defaultRegistry}`,
    { cwd: "./dist" }, 
    logExec
  )

  await childProcess.exec(
    `npm publish --registry=${defaultRegistry}`,
    { cwd: "./dist" }, 
    logExec
  )
  }catch(err) {
    process.exit(1)
  }

  
}

execCommand()
