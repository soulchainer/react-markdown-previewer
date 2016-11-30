const development = require('./config/development');
const production = require('./config/production');

module.exports = function webpackConfig(env) {
  const envs = {
    dev: development,
    prod: production,
  };
  return envs[env.environment];
};
