import { Router } from 'express';

import login from './login';
import signup from './signup';
import profile from './profile';
import request from './request';

const router = Router();

router.use('/login', login);
router.use('/signup', signup);
router.use('/profile', profile);
router.use('/request', request);

router.get('/', (req, res) => {
  res.send('hello world');
});

export default router;
