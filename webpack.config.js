/* eslint-disable */
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var plugins = [
  new CopyWebpackPlugin([
              // copy styleguide
              { from: 'node_modules/ndla-learningpath-styleguide/assets/', to: 'assets'},
              // copy clients (and dependencies) which does'nt use ES2015 modules
              { from: 'css', to: 'css' },
              { from: 'js', to: 'js' },
              { from: 'lti', to: 'lti' },
              { from: 'content-api', to: 'content-api' },
              { from: 'h5p-api', to: 'h5p-api' },
              { from: 'image-api', to: 'image-api' },
            ])

]

var entries = {
  'index': './index.html',
  // Add new clients here
  // 'google-custom-search': ['./google-custom-search/index.html', 'babel-polyfill', './google-custom-search/index.js'],
  'digital-libraries-search': ['./digital-libraries-search/index.html', 'babel-polyfill', './digital-libraries-search/index.js'],
}

module.exports = {
  context: __dirname,
  entry: entries,
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
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }

};
/* eslint-enable */
