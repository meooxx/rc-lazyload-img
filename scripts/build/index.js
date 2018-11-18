const rollup = require("rollup");
const ts = require("rollup-plugin-typescript2");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const convert2cjs = require("rollup-plugin-commonjs");
const replace = require('rollup-plugin-replace')
const path = require('path')
const { asyncRimraf } = require('../utils')
const {generatePublishDir} = require("../generatePublishDir")
 
// const DEV = 'development'
const PRO = "production"

const srcDir = path.resolve("./src")

const plugins = [
  replace({'process.env.NODE_ENV': JSON.stringify("production")}),
  resolve(),
  babel({
    exclude: "node_modules/**"
  }),
  convert2cjs({
    include: "node_modules/**",
    namedExports: {
      "node_modules/react/index.js": ["createElement", "Component", "forwardRef"]
    }
  }),
  ts()
];

const inputOptions = {
  input: `${srcDir}/index.tsx`,
  plugins: plugins
};
const getOutputOptions = (f = "cjs") =>  ({
  name: "rc-lazyload-img",
  file: "./dist/lib/rc-lazyload-img.js",
  format: f
});

async function build() {
  console.log("delete old lib...")
  await asyncRimraf('./dist')

  console.log("building...")
  const bundle = await rollup.rollup(inputOptions);
  const outputOptions = getOutputOptions('cjs')
  await bundle.write(outputOptions);
  console.log("build done")
  console.log("generatePublishDir")
  generatePublishDir() // 生成包文件
  console.log("all done")
}

build();

