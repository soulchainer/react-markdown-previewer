import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import Config from 'webpack-config'; // eslint-disable-line import/no-extraneous-dependencies
import { resolve } from 'path'; // eslint-disable-line import/no-extraneous-dependencies

export default new Config().extend('config/webpack.base.config.babel.js').merge({
  devtool: 'cheap-eval-source-map',
  output: {
    path: resolve(__dirname, 'build/js'),
    pathinfo: true,
  },
  module: {
    rules: [
      // Preloaders
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
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
      // Text files
      {
        test: /\.md$/,
        loader: 'raw-loader',
        include: [
          resolve(__dirname, 'static/doc'),
        ],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
});
