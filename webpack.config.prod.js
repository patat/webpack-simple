const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].css');

module.exports = {
  devtool: "cheap-eval-source-map",

  entry: {
    bundle: './src'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract({
          loader: 'css-loader?importLoaders=1&minimize=1!postcss-loader'
        }),
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/normalize.css')
        ]
      },
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        include: path.resolve(__dirname, 'src')
      }, 
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        include: path.resolve(__dirname, 'src/fonts')
      },
      {
        test: /\.(jpe?g|png|gif|(?!svg))$/i, 
        loader: "file-loader?name=img/[name].[ext]",
        include: path.resolve(__dirname, 'src/img')
      },
      { 
        test: /\.jade$/, 
        loader: 'jade-loader?pretty' 
      }
    ]
  },

  plugins: [
    extractCSS,
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.template.jade',
      devServer: false
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],

  externals: {
    jquery: 'jQuery'
  },
};