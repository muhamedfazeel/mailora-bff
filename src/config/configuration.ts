import { registerAs } from '@nestjs/config';

const env = process.env;

export default registerAs('config', () => ({
  server: {
    env: env.NODE_ENV,
    port: env.PORT,
  },
  logger: {
    level: env.LOG_LEVEL,
    prettyPrint: env.PRETTY_PRINT_LOG === 'true',
  },
  swagger: {
    enabled: env.SWAGGER_ENABLED === 'true',
    user: env.SWAGGER_USER,
    password: env.SWAGGER_PASSWORD,
  },
  api: {
    url: env.API_SERVER_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiry: env.JWT_EXPIRY,
  },
}));
