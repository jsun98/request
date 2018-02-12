import { Router } from 'express';

import login from './login';
import signup from './signup';
import profile from './profile';
import sequelize from '../data/sequelize';
import { Ledger } from '../data/models/index';

const router = Router();

router.use('/login', login);
router.use('/signup', signup);
router.use('/profile', profile);

router.get('/', (req, res) => {
  sequelize
    .sync({
      force: false,
    })
    .then(() => {
      Ledger.create({
        id: 1,
        date: '2018-01-01',
        debit_user: 'bbb',
        credit_user: 'aaa',
        amount: 20,
      }).then(() => {
        Ledger.create({
          id: 2,
          date: '2018-01-01',
          debit_user: 'bbb',
          credit_user: 'aaa',
          amount: 20,
        }).then(() => {
          Ledger.create({
            id: 3,
            date: '2018-01-01',
            debit_user: 'aaa',
            credit_user: 'bbb',
            amount: 50,
          });
        });
      });
    });
  res.send('hello world');
});

export default router;
