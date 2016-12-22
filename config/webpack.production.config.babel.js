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
    delete conf.plugins;

    return conf;
  },
}).merge({
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
  },
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
              query: {
                importLoaders: 2,
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});
