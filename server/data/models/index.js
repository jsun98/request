import sequelize from '../sequelize';
import User from './user';
import Request from './request';
import Ledger from './ledger';
import Active from './active';
import { Triggers } from './sqlConstants';

const sync = (...args) => {
  sequelize
    .sync(...args)
    .then(() => {
      console.info('Successfully synced database.');
      sequelize.query(Triggers.updateActives.drop).then(() => {
        sequelize
          .query(Triggers.updateActives.create)
          .then(() => console.log('Trigger created successfully'));
      });
    })
    .catch(err => {
      console.error('Unable to sync database', err);
    });
};

const Model = { sync };

export { User, Request, Ledger, Active };
export default Model;
