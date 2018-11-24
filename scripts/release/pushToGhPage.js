

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

  sub.stderr.setEncoding('utf-8')
  sub.stdout.setEncoding('utf-8')

  try {
    sub.stdin.write(`
      pwd && ls\n
      git init \n
      mkdir ~/.ssh  2>&1 \n
      echo "-----添加 remote address => known_hosts-----"\n
      # ssh-keyscan -t rsa -H github.com 2>&1 | sort -u - ~/.ssh/known_hosts > ~/.ssh/temp \n      
      # mv ~/.ssh/temp ~/.ssh/known_hosts \n
      ssh-keyscan -t rsa -H github.com 2>&1> ~/.ssh/known_hosts \n
      echo "----------" \n

      git config user.name "superq"\n
      git config user.email "qq1143094348@gmail.com"\n
      git remote add origin ${gitAddr} \n
      git add . \n
      git commit -m "gh-pages" \n
      git status \n
      git push origin HEAD:gh-pages -f \n
    `)
    sub.stdin.end()

  }catch(err) {
    console.log("err: ", err)
  }
  


  sub.stdout.on("data", (data) => {
    console.log("onData:", data)
   
  })
  
  sub.on('exit', (...r)=>{
    try {
      console.log(r)
    }catch(e){

    }

  })
  
  sub.stderr.on('data', data=>{
    console.log('stderr: ', data)
    //process.exit(1)

  })

}


pushToPage()



