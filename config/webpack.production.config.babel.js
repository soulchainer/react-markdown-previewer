import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import Config from 'webpack-config'; // eslint-disable-line import/no-extraneous-dependencies
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line import/no-extraneous-dependencies
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin'; // eslint-disable-line import/no-extraneous-dependencies

const HtmlWebpackPluginConf = new HtmlWebpackPlugin({
  filename: '../index.html',
  template: resolve(__dirname, '../static/html/index.html'),
  inject: 'body',
  minify: {
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
  },
  hash: true,
});
const extractSCSS = new ExtractTextPlugin({
  filename: '../styles/bundle.css',
  disable: false,
  allChunks: true,
});

export default new Config().extend({
  'config/webpack.development.config.babel.js': (config) => {
    const conf = config;

    delete conf.devtool;
    delete conf.output.pathinfo;

    return conf;
  },
}).merge({
  output: {
    path: resolve(__dirname, '../dist/js'),
  },
  module: {
    rules: [
      // JavaScript
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      // Styles
      {
        test: /\.scss$/,
        loader: extractSCSS.extract({
          loader: [
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
        }),
      },
    ],
  },
  plugins: [
    extractSCSS,
    HtmlWebpackPluginConf,
    new webpack.optimize.UglifyJsPlugin(),
  ],
});
