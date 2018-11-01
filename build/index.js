
const rollup = require('rollup')
const ts = require('rollup-plugin-typescript')
const resolve = require("rollup-plugin-node-resolve")
const babel = require("rollup-plugin-babel")

const inputOptions = {
  input: "../src",
  plugins: [
    resolve(), 
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    ts(),
  ]
}
const outputOptions = {
  name: "rc-lazyload-img",
  file: "../lib/rc-lazyload-img.js",
  format: "cjs"
}

module.exports =  async function build() {
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}