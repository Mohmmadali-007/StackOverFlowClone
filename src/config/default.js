const config = {
  SWAGGER_URL: process.env.SWAGGER_URL || 'localhost:8000',
  PORT: process.env.PORT || '8000',
  DATABASE: {
    NAME: process.env.DB_NAME || 'stack_over_flow',
    USER: process.env.DB_USERNAME || 'admin',
    PASSWORD: process.env.DB_PASSWORD || 'password',
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 3306,
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
    DEBUG: process.env.DEBUG || true,
  },
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRY: process.env.JWT_EXPIRE || 3600,
  REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET || '',
  REFRESH_JWT_EXPIRE: process.env.REFRESH_JWT_EXPIRE || 3600,
  SALT_LENGTH: process.env.SALT_LENGTH || 9,
  CRYPTO_KEY: process.env.CRYPTO_KEY || 'rr43r34t43t',
};

module.exports = config;
