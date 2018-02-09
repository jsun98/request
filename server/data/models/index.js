import sequelize from '../sequelize';
import User from './user';
import Active from './active';
import Ledger from './ledger';

const sync = (...args) => {
  sequelize
    .sync(...args)
    .then(() => {
      console.info('Successfully synced database.');
    })
    .catch(err => {
      console.error('Unable to sync database', err);
    });
};

const Model = { sync };

export { User,Ledger, Active };
export default Model;
