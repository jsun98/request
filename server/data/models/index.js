import sequelize from '../sequelize';
import User from './user';

const sync = (...args) => {
  sequelize
    .sync(...args)
    .then(() => {
      console.info('Successful synced database.');
    })
    .catch(err => {
      console.error('Unable to sync database', err);
    });
};

const Model = { sync };

export { User };
export default Model;
