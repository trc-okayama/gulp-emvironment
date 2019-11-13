const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ['@babel/preset-env',
                  {
                    modules: false
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
}