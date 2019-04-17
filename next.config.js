const withCSS = require("@zeit/next-css")
const webpack = require("webpack")
require("dotenv").config()

module.exports = withCSS({
  target: "serverless",
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))
    return config
  },
})
