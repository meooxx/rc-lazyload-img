

const cp = require('child_process')
const fse = require('fs-extra')
const {asyncRimraf} = require('../utils')

const copyToPage = () => {
  fse.copySync("./example/demo1/build", './gh-pages')
}


const rootDir = process.cwd()
const gitAddr = `git@github.com:meooxx/rc-lazyload-img.git`


const pushToPage = async () => {
  try {
    await asyncRimraf(`${rootDir}/gh-pages`)
  }catch(err) {
    console.log(err + "\n")
    console.log('gh-pages, 已经不存在')
  }

  await copyToPage()

  const sub = cp.spawn(
    'bash', 
    {
      cwd: `${rootDir}/gh-pages`

    }
  )
  try {
    await sub.stdin.write(`
      pwd \n
      git init \n
      git config user.name "superq"
      git config user.email "qq1143094348@gmail.com"
      git remote add origin ${gitAddr} \n
      git add . \n
      git commit -m "gh-pages" \n
      git status \n
      git push origin HEAD:gh-pages -f \n
    `)
   // await  sub.stdin.end()

  }catch(err) {
    console.log(err)
  }
  


  sub.stdio.forEach(io=>io.setEncoding('utf-8'))
  sub.stdout.on("data", (data) => {
    console.log(data)
    if(data.indexOf(`(yes/no)`)){
      sub.stdin.end('yes')
    }
  })

  
  sub.stderr.on('data', data=>{
    console.log('stderr: ', data)
    process.exit(1)

  })

}


pushToPage()

