
const rollup = require('rollup')
const ts = require('rollup-plugin-typescript2')
const resolve = require("rollup-plugin-node-resolve")
const babel = require("rollup-plugin-babel")
const convert2cjs = require('rollup-plugin-commonjs')

const inputOptions = {
  input: require.resolve("../src/hello.jsx"),
  plugins: [
    convert2cjs({
      exclude:['node_modules/**'],
      namedExports: {
        'node_modules/react/index': [
          'React',
          'cloneElement',
          'createElement',
          'PropTypes',
          'Children',
          'Component',
       ],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    resolve({
      //jsnext: true,
      //main: true,
      //browser: true
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    ts({
      typescript: require('typescript'),
    }),
  ]
}
const outputOptions = {
  name: "rc-lazyload-img",
  file: "./lib/rc-lazyload-img.js",
  format: "cjs"
}

async function build() {
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

build()