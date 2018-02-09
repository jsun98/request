import { Router } from 'express';
import passport from '../../passport';

const router = Router();

router.post('/', passport.authenticate('local'), (req, res) => {
  res.send('successful login request made!');
});

export default router;
