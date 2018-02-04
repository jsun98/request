import Sequelize from 'sequelize';
import config from '../config';

const sequelize = new Sequelize({
  database: config.db.database,
  host: config.db.host,
  username: config.db.user,
  password: config.db.pass,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.info('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
