import Config, { environment } from 'webpack-config'; // eslint-disable-line import/no-extraneous-dependencies

environment.setAll({
  env: () => process.env.NODE_ENV,
});

export default new Config().extend('config/webpack.[env].config.babel.js');
