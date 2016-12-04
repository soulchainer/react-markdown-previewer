import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import Config from 'webpack-config'; // eslint-disable-line import/no-extraneous-dependencies
import { resolve } from 'path'; // eslint-disable-line import/no-extraneous-dependencies
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line import/no-extraneous-dependencies

const extractHTML = new ExtractTextPlugin({
  filename: '../index.html',
  disable: false,
  allChunks: true,
});

export default new Config().extend('config/webpack.base.config.babel.js').merge({
  devtool: 'cheap-eval-source-map',
  output: {
    path: resolve(__dirname, '../build/js'),
    pathinfo: true,
  },
  module: {
    rules: [
      // HTML files
      {
        enforce: 'pre',
        test: /\.html$/,
        include: resolve(__dirname, '../static/html'),
        loader: extractHTML.extract({
          loader: [
            {
              loader: 'raw-loader',
            },
          ],
        }),
      },
      // JavaScript
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      // Styles
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    extractHTML,
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
});
