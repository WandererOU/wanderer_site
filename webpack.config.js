const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJsPlugin({
      uglifyOptions: {
        beautify: false,
        ecma: 6,
        compress: true,
        comments: false
      }
    }),
    new CopyWebpackPlugin([
        { from: './src/assets/images', to: 'images' },
        { from: './src/assets/fonts/Poppins_SemiBold.json', to: 'fonts'},
        { from: './src/assets/scenes', to: 'scenes' },
        { from: './src/assets/meta', to: 'meta'}
    ]),
    new HtmlWebpackPlugin({
      title: 'Wånderer Studio',
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'production',
  cache: true,
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: ['transform-class-properties']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};