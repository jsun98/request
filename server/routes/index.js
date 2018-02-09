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
        id: 5,
        date: '2018-01-01',
        debit_user: 'bbb',
        credit_user: 'aaa',
        amount: 20,
      });
    });
  res.send('hello world');
});

export default router;
