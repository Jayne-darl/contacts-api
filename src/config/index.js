import { devConfig } from './dev';
import { prodConfig } from './prod';
import { testConfig } from './test';

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  port: process.env.PORT || 5000,
};

let envConfig = {};

switch (env) {
  case 'development':
    envConfig = {
      ...devConfig,
    };
    break;
  case 'test':
    envConfig = {
      ...testConfig,
    };
    break;
  case 'production':
    envConfig = {
      ...prodConfig,
    };
    break;
  default:
    envConfig = {
      ...devConfig,
    };
}

const appConfig = { ...baseConfig, ...envConfig };

export default appConfig;
