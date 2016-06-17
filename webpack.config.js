/* eslint-disable */
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    'index': './index.html',
    'google-custom-search': ['babel-polyfill', './google-custom-search/index.html', './google-custom-search/index.js'],
  },
  target: 'web',
  cache: true,
  debug: true,
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].js',
    pathinfo: false
  },

  devServer: {
    contentBase: './build',
    port: 3000,
    historyApiFallback: true
  },

  module: {
    loaders: [
      {
        test: /\.jsx?|\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.html$/,
        loader: [
          'file-loader?name=[path][name].[ext]',
        ].join('!')
      },
    ]
  },

  plugins: [],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }

};
/* eslint-enable */
