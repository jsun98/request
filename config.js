import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV;

const development = {
 app: {
   port: parseInt(process.env.DEV_APP_PORT) || 3000
 },
 db: {
   host: process.env.DEV_DB_HOST || 'localhost',
   user: process.env.DEV_DB_USER || 'root',
   pass: process.env.DEV_DB_PASS || ''
 }
};

const config = {
  development
};

export default config[env];
