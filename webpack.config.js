const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('styles/[name].css');

module.exports = {
  devtool: "cheap-eval-source-map",

  entry: {
    bundle: './src'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract({
          loader: 'css-loader?importLoaders=1!postcss-loader'
        }),
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        include: path.resolve(__dirname, 'src')
      }
    ]
  },

  plugins: [
    extractCSS
  ],

  devServer: {
    contentBase: './',
    watchContentBase: true,
    publicPath: "/dist/"
  }
};