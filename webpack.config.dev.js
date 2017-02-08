const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].css');
const NODE_ENV = process.env.NODE_ENV;


const config = {
  devtool: "cheap-eval-source-map",

  entry: {
    bundle: './src'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract({
          loader: 'css-loader?importLoaders=1!postcss-loader'
        }),
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/normalize.css')
        ]
      },
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'src/vendor')
      }, 
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        include: path.resolve(__dirname, 'src/fonts')
      },
      {
        test: /\.(jpe?g|png|gif)$/i, 
        loader: "file-loader?name=img/[name].[ext]",
        include: path.resolve(__dirname, 'src/img')
      },
      {
        test: /\.svg$/i,
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
      devServer: (NODE_ENV === 'live' ? 'http://localhost:8080' : false),
      scripts: [
        'vendor/svgxuse.min.js'
      ]
    }),
    new CopyWebpackPlugin([{
      from: 'src/vendor/',
      to: 'vendor/'
    }])
  ],

  devServer: {
    contentBase: path.join(__dirname, "src"),
    watchContentBase: true,
    publicPath: '/'
  },

  externals: {
    jquery: 'jQuery'
  }
};

module.exports = config;