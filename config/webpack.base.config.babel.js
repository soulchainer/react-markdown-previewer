import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import Config from 'webpack-config'; // eslint-disable-line import/no-extraneous-dependencies

export default new Config().merge({
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './src/index.jsx',
    vendor: 'librerías de terceros que apenas cambian',
  },
  output: {
    filename: '[name].js',
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
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
    }),
  ],
});
