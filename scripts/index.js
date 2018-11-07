const rollup = require("rollup");
const ts = require("rollup-plugin-typescript2");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const convert2cjs = require("rollup-plugin-commonjs");

const plugins = [
  babel({
    exclude: "node_modules/**" // only transpile our source code
  }),
  resolve(),
  convert2cjs({
    include: ["../node_modules/**"],
    namedExports: {
      "../node_modules/react/index": ["createElement", "Component", "forwardRef"]
    }
  }),

  ts({
    typescript: require("typescript")
  })
];

const inputOptions = {
  input: require.resolve("../src/index.tsx"),
  plugins: plugins
};
const outputOptions = {
  name: "rc-lazyload-img",
  file: "./lib/rc-lazyload-img.js",
  format: "cjs"
};

async function build() {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

build();
