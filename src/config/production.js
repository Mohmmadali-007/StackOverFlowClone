const config = {
  DOMAIN: process.env.DOMAIN || 'localhost:8000',
  DOMAIN_URL: process.env.DOMAIN_URL || 'localhost:3000',
  PORT: process.env.PORT || '8000',
  DATABASE: {
    NAME: process.env.DB_NAME || '',
    USER: process.env.DB_USERNAME || '',
    PASSWORD: process.env.DB_PASSWORD || '',
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 3306,
    DB_DIALECT: process.env.DB_DIALECT || '',
    DEBUG: process.env.DEBUG || true,
  },
  USER_MANAGEMENT_SERVICE_URL: process.env.USER_MANAGEMENT_SERVICE_URL,
};

module.exports = config;
