import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import Config from 'webpack-config'; // eslint-disable-line import/no-extraneous-dependencies
import { resolve } from 'path';

export default new Config().merge({
  resolve: {
    alias: {
      highlight: resolve(__dirname, '../static/lib/highlight/index.js'),
    },
    extensions: ['.js', '.jsx'],
  },
  context: resolve(__dirname, '..'),
  entry: {
    app: './src/index.jsx',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  module: {
    rules: [
      // Preloaders
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          configFile: './.eslintrc.json',
        },
      },
      // Text files
      {
        enforce: 'pre',
        test: /\.md$/,
        loader: 'raw-loader',
        include: resolve(__dirname, '../static/doc'),
      },
      // JSON files
      {
        enforce: 'pre',
        test: /\.json$/,
        loader: 'json-loader',
        include: [
          resolve(__dirname, '../node_modules/entities/maps'),
          resolve(__dirname, '../node_modules/markdown-it-emoji/lib/data'),
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
  ],
});
