import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import Config from 'webpack-config'; // eslint-disable-line import/no-extraneous-dependencies
import { resolve } from 'path'; // eslint-disable-line import/no-extraneous-dependencies
import HtmlWebpackPlugin from 'html-webpack-plugin'; // eslint-disable-line import/no-extraneous-dependencies

const HtmlWebpackPluginConf = new HtmlWebpackPlugin({
  filename: '../index.html',
  template: resolve(__dirname, '../static/html/index.html'),
  inject: 'body',
  hash: true,
});

export default new Config().extend('config/webpack.base.config.babel.js').merge({
  devtool: 'cheap-eval-source-map',
  output: {
    path: resolve(__dirname, '../build/js'),
    pathinfo: true,
  },
  module: {
    rules: [
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
    HtmlWebpackPluginConf,
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
});
