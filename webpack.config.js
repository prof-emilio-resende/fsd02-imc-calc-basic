const path = require("path")
const plugins = []

const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: []
  }
}

module.exports = (env, argv) => {
  if (argv.mode !== "production") {
    config.devtool = "source-map"
  }

  config.plugins = plugins;
  config.mode = argv.mode;

  return config;
}