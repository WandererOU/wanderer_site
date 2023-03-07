const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const options = {
  entry: './src/index.js',
  plugins: [
    // new CleanWebpackPlugin(['docs']),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/images', to: 'images' },
        { from: './src/assets/fonts/Poppins_SemiBold.json', to: 'fonts' },
        { from: './src/assets/scenes', to: 'scenes' },
        { from: './src/assets/meta', to: 'meta' },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Wånderer Studio',
      template: 'index.html',
      google_code: process.env.google_code,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: process.env.NODE_ENV,
  cache: true,
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    https: true,
    compress: true,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  options.devtool = 'source-map';
}

module.exports = options;
