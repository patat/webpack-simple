const path = require('path');
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
      // {
      //   test: /\.html$/,
      //   loader: 'file-loader?name=[path][name].[ext]!extract-loader!html-loader',
      //   include: path.resolve(__dirname, 'src')
      // }
    ]
  },

  plugins: [
    extractCSS,
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: 'src/index.template.jade',
      devServer: 'http://localhost:8080',
      title: 'My App',

      // Optional
      // appMountId: 'app',
      // baseHref: 'http://example.com/awesome',
      
      // googleAnalytics: {
      //   trackingId: 'UA-XXXX-XX',
      //   pageViewOnLoad: true
      // },
      // meta: [
      //   {
      //     name: 'description',
      //     content: 'A better default template for html-webpack-plugin.'
      //   }
      // ],
      // mobile: true,
      // links: [
      //   'https://fonts.googleapis.com/css?family=Roboto',
      //   {
      //     href: '/apple-touch-icon.png',
      //     rel: 'apple-touch-icon',
      //     sizes: '180x180'
      //   },
      //   {
      //     href: '/favicon-32x32.png',
      //     rel: 'icon',
      //     sizes: '32x32',
      //     type: 'image/png'
      //   }
      // ],
      // inlineManifestWebpackName: 'webpackManifest',
      // scripts: [
      //   'http://example.com/somescript.js',
      //   {
      //     src: '/myModule.js',
      //     type: 'module'
      //   }
      // ],
      
      // window: {
      //   env: {
      //     apiHost: 'http://myapi.com/api/v1'
      //   }
      // }

      // And any other config options from html-webpack-plugin:
      // https://github.com/ampedandwired/html-webpack-plugin#configuration
    })
  ],

  devServer: {
    contentBase: '/',
    watchContentBase: true,
    publicPath: '/'
  }
};