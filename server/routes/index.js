import { Router } from 'express';

import login from './login';
import signup from './signup';
import profile from './profile';

const router = Router();

router.use('/login', login);
router.use('/signup', signup);
router.use('/profile', profile);

router.get('/', (req, res) => {
  res.send('hello world');
});

export default router;
