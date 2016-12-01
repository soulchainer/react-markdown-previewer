const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

module.exports = {
  eslint: {
    configFile: './.eslintrc.json',
  },
  entry: {
    app: './src/components/index.jsx',
    vendor: 'librerías de terceros que apenas cambian',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js'),
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
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
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
      // Text files
      {
        test: /\.md$/,
        loader: 'raw-loader',
        include: [
          path.resolve(__dirname, 'static/doc'),
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: true },
    }),
  ],
};
