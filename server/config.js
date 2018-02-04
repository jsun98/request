import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV;

const development = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
  },
  db: {
    database: process.env.DEV_DB_DATABASE || 'request',
    host: process.env.DEV_DB_HOST || 'localhost',
    user: process.env.DEV_DB_USER || 'root',
    pass: process.env.DEV_DB_PASS || '',
    options: {
      forced: process.env.DEV_DB_OPT_FORCED || true,
    },
  },
};

const config = {
  development,
};

export default config[env];
