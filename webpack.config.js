const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  mode: 'production',
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: path.resolve(__dirname, 'public/index.html'),
        loader: 'prerender-loader?string'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',  
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            },
          },
        ],
      },
    ],
  },
  serve: {
    content: path.resolve(__dirname, 'src/index.js'),
    dev: {
      publicPath: path.resolve(__dirname, 'build'),
    },
    open: true,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.css'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
};
